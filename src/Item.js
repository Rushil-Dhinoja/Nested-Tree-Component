/** @format */

import React, { useCallback, useEffect, useState, useRef } from "react";

import "./App.css";

const Item = props => {
	// Destructuring PROPS
	const { source, children, checked } = props;

	// State To if children will be visible or not
	const [showChildren, setShowChildren] = useState(false);

	// State to check if parent is checked or not
	const [parentCheck, setParentCheck] = useState(false);

	// State to check if single children is checked or not
	const [childCheck, setChildCheck] = useState(false);

	// State to check if every child is checked or not
	const [allCheck, setAllCheck] = useState(false);

	// Reference for checkbox
	const checkboxRef = useRef(null);

	// Handler function to collapse and expand childrens
	const handleClick = useCallback(() => {
		setShowChildren(!showChildren);
	}, [showChildren, setShowChildren]);

	// Use Effect to handle check function
	useEffect(() => {
		setParentCheck(checked);
		if (children && children.length === 0) {
			setChildCheck(checked);
		}
	}, [setParentCheck, checked, setChildCheck, children]);

	// Handler function to handle checkbox of individual item

	const handleCheck = () => {
		// If parent is clicked after deselecting one of the child will make the parent look like checkbox again
		if (
			checkboxRef.current.parentNode.parentNode.classList.contains("demo-icon")
		) {
			checkboxRef.current.parentNode.parentNode.classList.remove("demo-icon");
		}

		// Will check if every child is selected or not
		checkboxRef.current.parentNode.parentNode.parentNode.childNodes.forEach(
			child => {
				if (child.childNodes[0].childNodes[0].checked) {
					return setAllCheck(true);
				} else {
					console.log("not true");
					return setAllCheck(false);
				}
			}
		);

		// if every child is selected will change the icon of checkbox
		if (allCheck) {
			checkboxRef.current.parentNode.parentNode.parentNode.parentNode.classList.remove(
				"demo-icon"
			);
			setAllCheck(false);
		} else {
			checkboxRef.current.parentNode.parentNode.parentNode.parentNode.classList.toggle(
				"demo-icon"
			);
		}

		// Will set the checkbox state for childrens
		if (children && children.length === 0) {
			setChildCheck(!childCheck);
			setParentCheck(false);
		} else {
			setParentCheck(!parentCheck);
		}
	};

	return (
		<div>
			<h4 className='container'>
				<input
					id='checkbox'
					type='checkbox'
					ref={checkboxRef}
					checked={children && children.length > 0 ? parentCheck : childCheck}
					onChange={() => handleCheck()}
				/>
				<span onClick={handleClick} className='checkbox'>
					{children && children.length > 0
						? !showChildren
							? "(+)"
							: "(-)"
						: ""}
				</span>
				<p className='title'>{source}</p>
			</h4>
			<div className='child-container'>
				{/* Recursive call if an ITEM consist of any further children's */}
				{showChildren &&
					children !== [] &&
					children.map((child, index) => (
						<Item
							key={index}
							{...child}
							checked={children.length > 0 ? parentCheck : childCheck}
						/>
					))}
			</div>
		</div>
	);
};

export default Item;
