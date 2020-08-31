import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Chip } from '@material-ui/core';
import { changeFilter } from '../redux/action/actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  type: string;
  filters: string[];
  changeFilter: (obj: { type: string; filter: string[] }) => Promise<void>;
};

function MultipleSelect(props: Props) {
  const { type, filters, changeFilter } = props;
  const classes = useStyles();
  const [currentFilters, setCurrentFilters] = React.useState<string[]>([]);

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setCurrentFilters(e.target.value as string[]);
    changeFilter({ type, filter: e.target.value as string[] });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">{type}</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={currentFilters}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {filters.map((filter) => (
            <MenuItem key={filter} value={filter}>
              <Checkbox checked={currentFilters.indexOf(filter) > -1} />
              <ListItemText primary={filter} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const mapDispatchToProps = {
  changeFilter,
};

export default connect(null, mapDispatchToProps)(MultipleSelect);
