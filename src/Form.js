import { FormikConsumer, useFormik } from "formik";
import * as Yup from 'yup';

// FORMIK
// library for creating forms

// create variable with useFormik hook
// pass object with initial states and onSubmit function




const Form = () => {
    const formik = useFormik({
        initialValues:{
            name: '',
            email:'',
            amount: 10,
            currency: '',
            text: '',
            terms: false
        },
        // use yup validation schema
        validationSchema: Yup.object({
            name: Yup.string()
                    .min(2, 'Too short')
                    .required('Enter value'),
            email: Yup.string()
                    .email('Enter valid email')
                    .required('Enter smth'),
            amount: Yup.number()
                    .min(5, 'Enter more')
                    .required('Enter'),
            currency: Yup.string()
                    .required('Select currency'),
            text: Yup.string()
                    .min(10, 'Enter more'),
            terms: Yup.boolean()
                    .required('Check it')
                    .oneOf([true], 'Check it')
        }),
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    })

    return (
        // add onSubmit attribute
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            {/* add values to the inputs */}
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                // onChange will change state and value
                onChange={formik.handleChange}
                // add onBlur to handle action with input
                onBlur={formik.handleBlur}
            />
            {/* add touched to see if there were some actions with input */}
            {formik.errors.name && formik.touched.name ? <div className={'error'}> {formik.errors.name}</div> : null}
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

            />
            {formik.errors.email && formik.touched.email ? <div className={'error'}> {formik.errors.email}</div> : null}
            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.amount && formik.touched.amount ? <div className={'error'}> {formik.errors.amount}</div> : null}

            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                >
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </select>
            {formik.errors.select && formik.touched.select ? <div className={'error'}> {formik.errors.select}</div> : null}

            <label htmlFor="text">Ваше сообщение</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

            />
            {formik.errors.text && formik.touched.text ? <div className={'error'}> {formik.errors.text}</div> : null}

            <label className="checkbox">
                <input name="terms" type="checkbox"                 
                value={formik.values.terms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.errors.terms && formik.touched.terms ? <div className={'error'}> {formik.errors.terms}</div> : null}

            <button type="submit">Отправить</button>
        </form>
    )
}

export default Form;