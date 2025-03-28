import React from "react";

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    color: 'primary' | 'danger' | 'success'
}