import {TextInput} from "@atom/inputs/TextInput.tsx";
import {IconUser} from "@atom/icons/IconUser.tsx";
import {IconPassword} from "@atom/icons/IconPassword.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {Card} from "@molecule/Card.tsx";
import {Field, Form, Formik, FormikProps} from "formik";
import * as Yup from 'yup';
import {login} from "@services/authent/authService.ts";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {useContext} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

export function Login() {
    const {saveCredentials, isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async (values) => {
        const response = await login(values);
        if (response.error) {
            toast.custom((t) => <Toast t={t} msg={response.error} level='danger' />)
        } else {
            saveCredentials(response.token, response.userId, response.username);
            toast.custom((t) => <Toast t={t} msg={"Bienvenue " + response.username} level="success"/>)
            navigate("/game/")
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
                            <Button level="primary" type="submit" label="Se connecter" />
                        </Form>
                    )}
                </Formik>
            </Card>
        </>
    );
}