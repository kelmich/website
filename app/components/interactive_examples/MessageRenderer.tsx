import React from "react";




interface MessageRendererProps {
    message: string | string[];
}

export const MessageRenderer: React.FC<MessageRendererProps> = ({ message }) => {
    if (!message) return null;

    return Array.isArray(message) ? (
        <div className="p-4 bg-background text-background-foreground text-sm flex flex-row justify-evenly">
            {message.map((msg, idx) => (
                <div key={idx}>
                    {msg}
                </div>
            ))}
        </div>
    ) : (
        <div className="p-4 bg-background text-background-foreground text-sm">
            {message}
        </div>
    );
};