import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ScrollDialog(props) {
  const [scroll, setScroll] = React.useState('paper');
  const { title, children, openPopup, onClose, param} = props;

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openPopup) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openPopup]);

  return (
    <div>
      <Dialog
        open={openPopup}
        onClose={onClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{param.tytul}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
          >
            {param.opis}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
