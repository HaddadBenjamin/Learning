import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface IItem { id : string; content : string }

const initialItems: IItem[] = Array.from({ length: 10 }).map((item, index) => ({
    id: `id-${index}`,
    content: `Quote ${index}`
}))

const grid = 8;

const QuoteItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
`;

function Quote({ quote, index } : { quote : IItem, index :  number}) {
    return (
        <Draggable draggableId={quote.id} index={index}>
            {provided => (
                <QuoteItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {quote.content}
                </QuoteItem>
            )}
        </Draggable>
    );
}

const QuoteList = React.memo(function QuoteList({ quotes }: any) {
    return quotes.map((quote: IItem, index: number) => (
        <Quote quote={quote} index={index} key={quote.id} />
    ));
});

function BeautifulDnd() {
    const [items, setItems] = useState<IItem[]>(initialItems);

    const reorder = (items : IItem[], dragIndex : number, dropIndex : number) =>
        items.map((e, i) =>
            i === dragIndex ? items[dropIndex] :
                i === dropIndex ? items[dragIndex] :
                    e
        );

    function onDragEnd(result : any) {
        if (!result.destination || result.destination.index === result.source.index) return;

        const ordonnedItems = reorder(items, result.source.index, result.destination.index);

        setItems(ordonnedItems);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <h2>With Beautiful Dnd</h2>
                <Droppable droppableId="list">
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <QuoteList quotes={items} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}

export default BeautifulDnd
