import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';

import {
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

type TArticleParamsFormProps = {
	defaultStates: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultStates,
	setCurrentArticleState,
}: TArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const asideStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	const [selected, setSelected] = useState(defaultStates.fontFamilyOption);

	const [radioGroupSelected, setRadioGroupSelected] = useState(
		defaultStates.fontSizeOption
	);

	const [fontColorsSelected, setFontColorsSelected] = useState(
		defaultStates.fontColor
	);

	const [backgroundColorsSelected, setBackgroundColorsSelected] = useState(
		defaultStates.backgroundColor
	);

	const [contentWidthArrSelected, setContentWidthArrSelected] = useState(
		defaultStates.contentWidth
	);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		const currentArticleState = {
			fontFamilyOption: selected,
			fontColor: fontColorsSelected,
			backgroundColor: backgroundColorsSelected,
			contentWidth: contentWidthArrSelected,
			fontSizeOption: radioGroupSelected,
		};

		setCurrentArticleState(currentArticleState);
	};

	function resetValue() {
		setSelected(fontFamilyOptions[0]);
		setRadioGroupSelected(fontSizeOptions[0]);
		setFontColorsSelected(fontColors[0]);
		setBackgroundColorsSelected(backgroundColors[0]);
		setContentWidthArrSelected(contentWidthArr[0]);

		setCurrentArticleState(defaultArticleState);
	}

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside className={asideStyle}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						selected={selected}
						onChange={setSelected}
						options={fontFamilyOptions}
						title='ШРИФТ'
					/>
					<div className={styles.blankContainer}></div>
					<RadioGroup
						selected={radioGroupSelected}
						name='fontSize'
						onChange={setRadioGroupSelected}
						options={fontSizeOptions}
						title='РАЗМЕР ШРИФТА'
					/>
					<div className={styles.blankContainer}></div>
					<Select
						selected={fontColorsSelected}
						onChange={setFontColorsSelected}
						options={fontColors}
						title='ЦВЕТ ШРИФТА'
					/>
					<div className={styles.blankContainer}></div>
					<Separator />
					<div className={styles.blankContainer}></div>
					<Select
						selected={backgroundColorsSelected}
						onChange={setBackgroundColorsSelected}
						options={backgroundColors}
						title='ЦВЕТ ФОНА'
					/>
					<div className={styles.blankContainer}></div>
					<Select
						selected={contentWidthArrSelected}
						onChange={setContentWidthArrSelected}
						options={contentWidthArr}
						title='ШИРИНА КОНТЕНТА'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							onClick={resetValue}
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
