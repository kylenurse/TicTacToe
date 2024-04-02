export default function Log () {
   return <ol id="Log">
    //comment
        {turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`}> {turn.player} selected {turn.square.row}, {turn.square.col}</li>)}
    </ol>
}