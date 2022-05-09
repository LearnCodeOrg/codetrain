import TooltipBase from '@mui/material/Tooltip';

export default function Tooltip(props) {
  const { title } = props;

  return (
    <TooltipBase title={title} arrow disableInteractive>
      {props.children}
    </TooltipBase>
  );
}
