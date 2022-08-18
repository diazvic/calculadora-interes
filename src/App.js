import styled from "styled-components";
import { useState } from "react";
import { Formik, Form } from "formik";
import Input from "./components/Input";
import Button from "./components/Button";
import Container from "./components/Container";
import Section from "./components/Section";
import Balance from "./components/Balance";
const compoundInterest = (deposit, contribution, years, rate) => {
	let total = deposit;
	for (let i = 0; i < years; i++) {
		total = (total + contribution) * (rate + 1);
	}
	return Math.round(total);
};
const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
const App = () => {
	const [balance, setBalance] = useState("");
	const handleSubmit = ({ deposit, contribution, years, rate }) => {
		const valor = compoundInterest(
			Number(deposit),
			Number(contribution),
			Number(years),
			Number(rate)
		);
		console.log(valor);
		setBalance(formatter.format(valor));
	};
	return (
		<Container>
			<Section>
				<Formik
					initialValues={{ deposit: "", contribution: "", years: "", rate: "" }}
					onSubmit={handleSubmit}
				>
					<Form>
						<Input name="deposit" label="Depósito Inicial" />
						<Input name="contribution" label="Contribución anual" />
						<Input name="years" label="Años" />
						<Input name="rate" label="Interés estimado" />
						<Button>Calcular</Button>
					</Form>
				</Formik>
				{balance !== "" ? <Balance>Balance Final: {balance}</Balance> : null}
			</Section>
		</Container>
	);
};
export default App;
