import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Form, Input } from "antd";
import React from "react";

const renderTitle = (product) => (
	<div className="options">
		<img className="product-image" src={product?.image} alt={product?.label} />
		<div className="px-1">
			<div className="product-name">{product?.label}</div>
			<div className="product-price">৳{product?.price}</div>
		</div>
	</div>
);

const options = (products, total, seeAllResults, form) => {
	const makeOption = products.map((product) => ({
		label: renderTitle(product),
		value: product.value,
	}));

	if (total !== products.length) {
		makeOption.push({
			label: (
				<div
					onClick={seeAllResults}
					className="px-1 py-2 text-center font-semibold text-[#61c868]"
				>
					See All Results
				</div>
			),
		});
	}

	return makeOption;
};

const AutocompleteWithImage = ({ search, products, onSearch, total, seeAllResults, form }) => (
	<Form
		form={form}
		name="searchData"
		initialValues={search}
		className="flex items-center space-x-1"
	>
		<Form.Item name="search">
			<AutoComplete
				dropdownMatchSelectWidth={500}
				style={{ width: 500 }}
				options={options(products, total, seeAllResults, form)}
			>
				<Input
					className="input"
					size="middle"
					onChange={(e) => onSearch(e.target.value)}
					suffix={<SearchOutlined className="icon" />}
				/>
			</AutoComplete>
		</Form.Item>
	</Form>
);

export default AutocompleteWithImage;
