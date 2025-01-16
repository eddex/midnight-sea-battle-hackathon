interface BoardCellProps {
  prefix: string;
  x: number;
  y: number;
  unsunkenShip?: boolean;
  hit?: boolean;
  miss?: boolean;
  target?: boolean;
  onClick?: (x: number, y: number) => void;
}

export default function BoardCell({
  prefix,
  x,
  y,
  onClick,
  unsunkenShip = false,
  hit = false,
  miss = false,
  target = false,
}: BoardCellProps) {
  const isClickable = onClick !== undefined;
  return (
    <td
      id={prefix + '-' + x + '-' + y}
      onClick={() => {
        if (onClick) {
          onClick(x, y);
        }
      }}
      className={'bg-blue-950 h-8 w-8 ' + (isClickable ? 'hover:bg-red-500 cursor-crosshair' : '')}
    >
      <span>
        {unsunkenShip ? '🚢' : ''}
        {hit ? '💥' : ''}
        {miss ? '❌' : ''}
        {target ? '🎯' : ''}
      </span>
    </td>
  );
}
