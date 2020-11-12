import React from 'react';

export type ToolHeaderProps = {
    headerString: string;
}

export function ToolHeader(props: ToolHeaderProps) { 

    return      <header>
                    <h1>{props.headerString}</h1>
                </header>
}
