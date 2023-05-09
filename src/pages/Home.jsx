import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AutocompleteWithImage from "../components/AutoCompleteField";
import NavCompanyIcon from "../components/NavCompanyIcon";
import robodocIcon from "../css/robodoc.png";

export default function Home() {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [total, setTotal] = useState(0);
	const [search, setSearch] = useState("");
	const [products, setProducts] = useState([]);

	const onClickNavigate = () => navigate("/");

	const onSearch = (value) => {
		setSearch(value);
	};

	const fetchData = async (url) => {
		try {
			let response = await fetch(url);
			response = await response.json();

			const formatProducts = response?.products.map((product) => ({
				id: product.id,
				value: product.title,
				label: product.title,
				brand: product.brand,
				category: product.category,
				image: product.images[0],
				price: product.price,
			}));
			if (search === "") {
				setTotal(response?.limit);
			}
			setProducts(formatProducts);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (search) {
			fetchData(`https://dummyjson.com/products/search?q=${search}`);
		} else {
			fetchData("https://dummyjson.com/products?limit=100");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	return (
		<>
			<nav className="bg-white shadow-md">
				<div className="max-w-6xl mx-auto px-4">
					<div className="flex justify-between items-center">
						<NavCompanyIcon
							companyName="RoboDoc"
							robodocIcon={robodocIcon}
							onClickNavigate={onClickNavigate}
						/>
						<div className="flex mt-4 items-center space-x-1">
							<AutocompleteWithImage
								form={form}
								search={search}
								total={total}
								products={products}
								onSearch={onSearch}
								seeAllResults={() => {
									setSearch("");
									form.resetFields();
									fetchData("https://dummyjson.com/products?limit=100");
								}}
							/>
						</div>

						<div className="sm:flex items-center space-x-3 ">
							<button type="button" onClick={onClickNavigate}>
								<UserOutlined className="py-2 px-2 font-medium text-gray-500 hover:text-white border rounded-full hover:bg-green-400 transition duration-300" />
							</button>
							<button type="button" onClick={onClickNavigate}>
								<Badge count={99} color="#22cb5b">
									<HeartOutlined className="py-2 px-2 font-medium text-gray-500 hover:text-white border rounded-full hover:bg-green-400 transition duration-300" />
								</Badge>
							</button>
							<button type="button" onClick={onClickNavigate}>
								<Badge count={99} color="#22cb5b">
									<ShoppingCartOutlined className="py-2 px-2 font-medium text-gray-500 hover:text-white border rounded-full hover:bg-green-400 transition duration-300" />
								</Badge>
							</button>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
