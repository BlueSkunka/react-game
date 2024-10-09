import {Card} from "@molecule/Card.tsx";
import {TextInput} from "@atom/inputs/TextInput.tsx";
import {IconUser} from "@atom/icons/IconUser.tsx";
import {IconPassword} from "@atom/icons/IconPassword.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {IconEmail} from "@atom/icons/IconEmail.tsx";
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {registerUser} from "@services/authent/authService.ts";
import {UserInterface} from "@interfaces/UserInterface.ts";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";

export function Register() {
    const submitHandler = async (values: UserInterface) => {
        const response = await registerUser(values)
        if (response.error) {
            toast.custom((t) => <Toast t={t} msg={response.error} level="primary" />)
        } else {
            toast.custom((t) => <Toast t={t} msg="Compte crée, veuillez valider votre email" level="success"/>)
        }
    }
    return (
        <>
            <Card title="Inscription">
                <Formik
                    initialValues={{lastname: '', firstname: '', email: '', username: '', password: '', passwordConfirm: ''}}
                    onSubmit={(values) => { submitHandler(values) }}
                    validationSchema={Yup.object({
                        lastname: Yup.string()
                            .required('Veuillez saisir un nom de famille'),
                        firstname: Yup.string()
                            .required('Veuillez saisir un prénom'),
                        email: Yup.string()
                            .required('Veuillez saisir un email')
                            .matches(/^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,4}$/, "Veuillez saisir une adresse email valide"),
                        username: Yup.string()
                            .required('Veuillez saisir un nom d\'utilisateur')
                            .max(10, '10 caractères max'),
                        password: Yup.string()
                            .required('Veuillez saisir un mot de passe')
                            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Veuillez saisir un mot de passe valide"),
                        passwordConfirm: Yup.string()
                            .required('Veuillez confirmer votre mot de passe')
                            .oneOf([Yup.ref('password')], 'Votre mot de passe ne correspond pas')
                    })}
                >
                    <Form>
                        <Field name="lastname" type="text" placeholder="Nom" icon={<IconUser />} component={TextInput} />
                        <Field name="firstname" type="text" placeholder="Prénom" icon={<IconUser/>} component={TextInput}/>
                        <Field name="email" type="text" placeholder="Email" icon={<IconEmail/>} component={TextInput}/>
                        <Field name="username" type="text" placeholder="Nom d'utilisateur" icon={<IconUser/>} component={TextInput}/>
                        <Field name="password" type="password" placeholder="Mot de passe" icon={<IconPassword/>} component={TextInput}/>
                        <Field name="passwordConfirm" type="password" placeholder="Confirmer votre mot de passe" icon={<IconPassword/>} component={TextInput}/>
                        <Button level="primary" type="submit" label="S'inscrire" />
                    </Form>
                </Formik>
            </Card>
        </>
    );
}
