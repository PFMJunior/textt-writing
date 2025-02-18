import { useState } from "react";
import styles from "./styles.module.css";

interface Props {
    id: string;
    text: string;
    onUpdate: (id: string, text: string) => void;
    onDelete: (id: string) => void;
}

export function Paragraph({ id, text, onUpdate, onDelete }: Props) {
    const [isEditing, setIsEditing]   = useState(false);
    const [editedText, setEditedText] = useState(text);

    const handleUpdate = () => {
        onUpdate(id, editedText);
        setIsEditing(false);
    };

    return(
        <>
            {isEditing ? (
                <div className={styles.edit}>
                    <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                    <div className={styles.buttons}>
                        <button onClick={handleUpdate}>Salvar</button>
                        <button onClick={() => setIsEditing(false)}>Cancelar</button>
                    </div>
                </div>
            ) : (
                <div className={styles.edit}>
                    <p>{text}</p>
                    <div className={styles.buttons}>
                        <button onClick={() => setIsEditing(true)}>Editar</button>
                        <button onClick={() => onDelete(id)}>Excluir</button>
                    </div>
                </div>
            )}
        </>
    );
}