import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Alert} from "@molecule/alerts/Alert.tsx";
import {IconWarning} from "@atom/icons/IconWarning.tsx";
import {IconSuccess} from "@atom/icons/IconSuccess.tsx";
import {IconError} from "@atom/icons/IconError.tsx";
import {validateEmail} from "@services/authent/authService.ts";

export function Validate() {
    const { id } = useParams()
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(true)

    validateEmail(id)
        .then((response) => {
            setValidated(response.verified)
        }).catch((error) => {
            setValidated(false)
        })
        .finally(() => {setLoading(false)})

    return (
        <>
            {loading ? (
                <Alert level="info" icon={<IconWarning/>} msg="Validation en cours" />
            ): null}

            {!loading && validated ? (
                <Alert level="success" icon={<IconSuccess/>} msg="Compte validé ! Bienvenue sur PokeBattle !" />
            ): null}

            {!loading && !validated ? (
                <Alert level="error" icon={<IconError/>} msg="Erreur lors de la validation du compte !" />
            ): null}
        </>
    );
}