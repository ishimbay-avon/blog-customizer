import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
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
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const asideStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isMenuOpen,
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

	const handleEscape = (e: KeyboardEvent) => {
		e.key == 'Escape' && setIsMenuOpen(!isMenuOpen);
	};

	const rootRef = useRef<HTMLInputElement | null>(null);

	const handleClick = (event: MouseEvent) => {
		const { target } = event;
		const isOutsideClick =
			target instanceof Node && // проверяем, что это `DOM`-элемент
			rootRef.current &&
			!rootRef.current.contains(target); // проверяем, что кликнули на элемент, который находится не внутри нашего блока
		if (isOutsideClick) {
			setIsMenuOpen(!isMenuOpen);
		}
	};

	useEffect(() => {
		if (!isMenuOpen) return;

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside ref={rootRef} className={asideStyle}>
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
