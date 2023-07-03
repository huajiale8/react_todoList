import './InputPage.css'
import { Button, Input, Radio } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import React, { useRef, useState } from 'react'
function InputPage() {
	const [list, setList] = useState(['1', '2', '3', '4'])
	const [inputValue, setInputValue] = useState('')
	const [flag, setFlag] = useState(true)
	const [newArray, setNewArray] = useState([])
	const [count, setCount] = useState(3)
	const [size, setSize] = useState('large')
	const msgRef = useRef()
	const add = () => {
		const newList = [...list, inputValue]
		setList(newList)
		setInputValue('')
	}
	const del = (index) => {
		const newArray = list.filter((item, i) => item !== index)
		setList(newArray)
	}
	const handleEdit = (index, event) => {
		const newValue = event.target.innerText
		const newArray = [...list]
		newArray[index] = newValue
		setList(newArray)
	}
	const handleInputChange = (event) => {
		setInputValue(event.target.value)
	}
	const handleSearch = () => {
		setFlag(false)
		const filteredArray = list.filter((item) => item === inputValue)
		setNewArray(filteredArray)
		if (newArray.length <= 0) {
			const interval = setInterval(() => {
				setCount((prevCount) => {
					if (prevCount === 0) {
						clearInterval(interval)
						setFlag(true)
					}
					return prevCount - 1
				})
			}, 1000)
		}
	}

	return (
		<div className="box">
			<div className="flex-box">
				<div className="header">
					<Input
						placeholder="请输入内容"
						ref={msgRef}
						value={inputValue}
						onChange={handleInputChange}
					/>
					<Button
						className="btn"
						onClick={() => add()}
						type="primary"
						shape="round"
						icon={<PlusOutlined />}
						size={size}
					/>
					<Button
						onClick={handleSearch}
						type="primary"
						shape="round"
						icon={<SearchOutlined />}
						size={size}
					/>
				</div>
				<div className="body">
					{flag ? (
						list.map((item, index) => (
							<div className="li_css" key={index}>
								<li
									className="li"
									key={item}
									onDoubleClick={(event) =>
										(event.target.contentEditable = true)
									}
									onBlur={(event) => {
										event.target.contentEditable = false
										handleEdit(index, event)
									}}
								>
									{item}
								</li>
								<Button
									onClick={() => del(item)}
									type="primary"
									danger
								>
									删除
								</Button>
							</div>
						))
					) : newArray.length && newArray.length > 0 ? (
						newArray.map((item, index) => (
							<div className="li_css" key={index}>
								<li
									key={item}
									onDoubleClick={(event) =>
										(event.target.contentEditable = true)
									}
									onBlur={(event) => {
										event.target.contentEditable = false
										handleEdit(index, event)
									}}
								>
									{item}
								</li>
								<button onClick={() => del(item)}>删除</button>
							</div>
						))
					) : (
						<p className="p">没有该数据,{count}秒后跳转</p>
					)}
				</div>
			</div>
		</div>
	)
}
export default InputPage
