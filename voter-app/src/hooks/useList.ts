import {useState} from 'react';
import { Item } from "../models/item";

export type AppendItem<S> = (newItem: Omit<S, "id">) => void;
export type ReplaceItem<S> = (itemToReplace: S) => void;
export type RemoveItem = (itemId: number) => void;
export type ResetList = () => void;

export type UseList = <T extends Item>(initialItems: T[]) => [    T[], 
                                            AppendItem<T>, 
                                            ReplaceItem<T>, 
                                            RemoveItem,
                                            ResetList,
                                       ];

export const useList: UseList = <T extends Item>(initialItems: T[]) => {

    const [items, setItems] = useState(initialItems);

    const appendItem: AppendItem<T> = (newItem) => {
        setItems([
            ...items,
            {
                ...newItem,
                id: Math.max(...items.map((c) => c.id), 0) + 1,
            } as T,
        ]);
        
    };

    const replaceItem: ReplaceItem<T> = (itemToReplace) => {
        const itemsCopy = [...items];
        var index = items.findIndex((c) => c.id === itemToReplace.id);
        itemsCopy[index] = itemToReplace;
        setItems(itemsCopy);
    };

    const removeItem: RemoveItem = (itemId: number) => {
        setItems(items.filter((item) => item.id !== itemId));
    };
    
    const resetList: ResetList = () => {
        setItems([]);
    }

    return[items, appendItem, replaceItem, removeItem, resetList];
};

