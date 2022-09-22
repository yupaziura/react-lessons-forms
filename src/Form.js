import { Formik, Form, Field,ErrorMessage, useField} from "formik";
import * as Yup from 'yup';

// FORMIK
// library for creating forms

// use Component Formik instead hook useFormic

const MyTextInput = ({label, ...props}) => {
    // useField returns array with 2 objects (field and meta)
    // field has propses
    // meta has ibfo about errors
    const [field, meta] = useField(props)
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className="error"> {meta.error}</div>
            ): null}
        </>
    )
}

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'})
    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...props} {...field}/>
                {children}
            </label>


            {meta.touched && meta.error ? (
                <div className="error"> {meta.error}</div>
            ): null}
        </>
    )
}



const FormFormik = () => {
    

    return (

        // add properties with initial values
        // and validation schema
        <Formik
            initialValues = {{
                name: '',
                email:'',
                amount: 10,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema = {Yup.object({
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
                })}
                onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
                <Form className="form" >
                <h2>Отправить пожертвование</h2>

                <MyTextInput label="Ваше имя"
                            id="name"
                            name="name"
                            type="text"/>
                

                <MyTextInput label="Ваша почта"
                            id="email"
                            name="email"
                            type="email"/>

                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className={'error'} name='amount' component='div'/>

                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as='select'
                    >
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className={'error'} name='currency' component='div'/>

                <label htmlFor="text">Ваше сообщение</label>
                <textarea 
                    id="text"
                    name="text"
                    as='textarea'
                />
                <ErrorMessage className={'error'} name='text' component='div'/>

                <MyCheckbox name='terms'>
                    Terms?
                </MyCheckbox>

                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default FormFormik;