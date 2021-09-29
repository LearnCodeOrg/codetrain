import BaseAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Accordion(props) {
  return (
    <BaseAccordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {props.title}
      </AccordionSummary>
      <AccordionDetails>
        {props.children}
      </AccordionDetails>
    </BaseAccordion>
  );
}
