import {TextInput} from "../../atom/inputs/TextInput.tsx";
import {IconUser} from "../../icons/IconUser.tsx";
import {IconPassword} from "../../icons/IconPassword.tsx";
import {ButtonSubmit} from "../../atom/buttons/ButtonSubmit.tsx";
import {Card} from "../../molecule/Card.tsx";

export function Login() {
    return (
        <>
            <Card title="Connexion">
                <TextInput type="text" placeholder="Nom d'utilisateur" icon={<IconUser/>}/>
                <TextInput type="password" placeholder="Mot de passe" icon={<IconPassword/>}/>
                <ButtonSubmit label="S'inscrire" />
            </Card>
        </>
    );
}