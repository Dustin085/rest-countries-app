function TextWithLabel({ label, text }: { label: string, text: string }) {
    return (
        <p className="dark:text-muted-foreground"><span className="dark:text-text-dark">{label + ": "}</span>{text}</p>
    );
}

export default TextWithLabel;