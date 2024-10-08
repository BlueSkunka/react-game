import {TextInput} from "@atom/inputs/TextInput.tsx";
import {IconUser} from "@icons/IconUser.tsx";
import {IconPassword} from "@icons/IconPassword.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {Card} from "@molecule/Card.tsx";
import {Field, Form, Formik, FormikProps} from "formik";
import * as Yup from 'yup';
import {login} from "@services/authent/authService.ts";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";

export function Login() {
    const submitHandler = async (values) => {
        const response = await login(values);
        console.log(response)
        if (response.error) {
            toast.custom((t) => <Toast t={t} msg={response.error} level='danger' />)
        } else {
            toast.custom((t) => <Toast t={t} msg="Connexion réussie !" level="success"/>)
        }
    }
    return (
        <>
            <Card title="Connexion">
                <Formik
                    initialValues={{username: '', password: ''}}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .required('Veuillez saisir un nom d\'utilisateur'),
                        password: Yup.string()
                            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "8 caractères minimum avec une lettre et un chiffre")
                            .required("Veuillez saisir votre mot de passe")

                    })}
                    onSubmit={(values) => {submitHandler(values)}}>
                    {(props: FormikProps<any>) => (
                        <Form>
                            <Field name="email" type="text" placeholder="Nom d'utilisateur" icon={<IconUser />} component={TextInput} />
                            <Field name="password" type="password" placeholder="Mot de passe" icon={<IconPassword />} component={TextInput} />
                            <Button type="submit" label="Se connecter" />
                        </Form>
                    )}
                </Formik>
            </Card>
        </>
    );
}