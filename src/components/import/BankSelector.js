import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import Bank, { banks } from '../../Bank';
import { setBank } from '../../reducers/appReducer';

class BankSelector extends React.Component {
  state = {
    open: false
  };

  handleChange = e => {
    const { changeBank } = this.props;
    const bank = banks.find(b => b.name === e.target.value);
    changeBank(bank);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { selectedBank } = this.props;
    const { open } = this.state;

    const value = selectedBank ? selectedBank.name : 'Other';

    const bankArray = banks.map(bank => (
      <MenuItem key={bank.name} value={bank.name}>
        {bank.name}
      </MenuItem>
    ));

    return (
      <div>
        <form autoComplete="off">
          <FormControl>
            <InputLabel htmlFor="demo-controlled-open-select">Bank</InputLabel>
            <Select
              open={open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={value}
              onChange={this.handleChange}
              inputProps={{
                name: 'bank',
                id: 'demo-controlled-open-select'
              }}
            >
              {bankArray}
            </Select>
          </FormControl>
        </form>
      </div>
    );
  }
}

BankSelector.propTypes = {
  selectedBank: PropTypes.shape(Bank).isRequired,
  changeBank: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selectedBank: state.appReducer.bank
});

export default connect(
  mapStateToProps,
  {
    changeBank: setBank
  }
)(BankSelector);
