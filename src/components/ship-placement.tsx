export default function ShipPlacement(props: {
  name: string;
  length: number;
  orientation: string;
  selected: boolean;
  isPlaced: boolean;
  onPlace: () => void;
  onToggleOrientation: () => void;
}) {
  return (
    <div className="my-1">
      <span className="font-bold">
        {props.name} (size: {props.length})
      </span>
      <button
        onClick={props.onToggleOrientation}
        className="text-black font-bold mx-1 py-1 px-1"
      >
        {props.orientation === 'horizontal' ? '➡️' : '⬇️'}
      </button>
      <button
        onClick={props.onPlace}
        disabled={props.selected}
        className={"text-black font-bold mx-1 py-1 px-1 rounded transition-colors duration-200 "
          + (props.selected ? 'bg-blue-400 hover:bg-blue-400' : 'bg-lime-200 hover:bg-lime-300')}
      >
        Place
      </button>
      <span className="ml-2">
        {props.isPlaced ? '✅' : ''}
      </span>
    </div>
  );
}
