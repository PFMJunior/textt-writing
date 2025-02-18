import styles from "./styles.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { Paragraph } from "../Paragraph";

interface Paragraph {
    id: string;
    text: string;
}

export function DraftEditor() {
    const [paragraphs, setParagraphs]     = useState<Paragraph[]>([]);
    const [newParagraph, setNewParagraph] = useState('');

    const addParagraph = () => {
        if (newParagraph.trim() !== '') {
            const newParagraphObject: Paragraph = {
                id: uuidv4(),
                text: newParagraph.trim(),
            };
            setParagraphs([...paragraphs, newParagraphObject]);
            setNewParagraph('');
        }
    };

    const updateParagraph = (id: string, text: string) => {
        const updatedParagraphs = paragraphs.map((paragraph) =>
            paragraph.id === id ? { ...paragraph, text } : paragraph
        );
        setParagraphs(updatedParagraphs);
    };
  
    const deleteParagraph = (id: string) => {
        const filteredParagraphs = paragraphs.filter((paragraph) => paragraph.id !== id);
        setParagraphs(filteredParagraphs);
    };

    return(
        <div className={styles.draftEditor}>
            <h2 className={styles.title}>Editor de Texto</h2>
            <div className={styles.top}>
                <textarea
                    value={newParagraph}
                    onChange={(e) => setNewParagraph(e.target.value)}
                    placeholder="Digite um novo parágrafo"
                />
                <button onClick={addParagraph}>Adicionar Parágrafo</button>
            </div>
            <div className={styles.draftEditorParagraph}>
                {paragraphs.map((paragraph) => (
                    <Paragraph
                        key={paragraph.id}
                        id={paragraph.id}
                        text={paragraph.text}
                        onUpdate={updateParagraph}
                        onDelete={deleteParagraph}
                    />
                ))}
            </div>
        </div>
    );
}