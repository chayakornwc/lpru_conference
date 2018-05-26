import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Gender from'./gender';
import Uploadfiles from './uploadfiles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import { connect } from 'react-redux';
import axios from 'axios';
import {saveUser} from '../../redux/actions/userActions';
 const alertify = require('alertify.js');
const styles = theme => ({
  container: {
    display:'block',
    flexWrap: 'wrap',
  
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    'max-width': 500,
   display:'flex'
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    display: 'inline-block'
  },
});

const prefxtitle = [
  {
    value: 'อาจารย์',
    label: 'อาจารย์',
  },
  {
    value: 'ดร.',
    label: 'ดร.',
  },
  {
    value: 'นาย',
    label: 'นาย',
  },
  {
    value: 'นางสาว',
    label: 'นางสาว',
  }, 

 
];



const gender = [
  {value: 'ชาย'},
 {value: 'หญิง'}
]; 

class TextFields extends React.Component {
 constructor(props){
   super(props);
    this.state = {
      first_name: null,
      prefxtitle: '',
      last_name:null,
      affiliation: null,
      address:null,
      city:null,
      gender:null,
      province: null,
      postal: null,
      country: null,
      email: null,
      confirm_email: null,
      error:false,
      emailvalid:false,
      district:null,
      isLoad:false,
      username:null,
      password:null,
      confirm_password:null
    };
  

 }
 resetState = () =>{
   this.setState({
    first_name: null,
    prefxtitle: '',
    last_name:null,
    affiliation: null,
    address:null,
    city:null,
    gender:null,
    province: null,
    postal: null,
    country: null,
    email: null,
    confirm_email: null,
    error:false,
    emailvalid:false,
    district:null,
    isLoad:false,
    username:null,
    password:null,
    confirm_password:null
   })
 }
 handleSubmit = (event)=>{
   event.preventDefault();
  this.setState({isLoad:true});
  const {registration} = this.props;
  const data = {
    first_name:this.state.first_name,
    prefxtitle:this.state.prefxtitle,
    last_name:this.state.last_name,
    affiliation:this.state.affiliation,
    address: this.state.address,
    city:this.state.city,
    gender:this.state.gender,
    province:this.state.province,
    postal:this.state.postal,
    email:this.state.email,
    district:this.state.district,
    username:this.state.username,
    password:this.state.password,
    user_group:7
  }
 
 return axios({
    method:'post',
    url: 'http://localhost:3009/registers',
    data:data,
  }).then(response =>{
    this.setState({isLoad:false});
    this.resetState();
    alertify.success("ดำเนินการสร้างบัญชีผู้ใช้ เรียบร้อยแล้ว โปรดดำเนินการขั้นต่อไป!");
  }).catch(err =>{
    this.setState({isLoad:false});
    alertify.error("การส้างบัญชีผู้ใช้ล้มเหลว อาจจะเกิดจากการเชื่อมต่อขัดข้อง โปรดลองใหม่อีกครั้ง!");
  })
    
  


 }
  Checked = (event, payment_type) => {
    this.setState({ payment_type });
    console.log(payment_type)
  };
 selectgender = (event, gender) =>{
   this.setState({gender})
 }
  handleChange = name => event => {
 
    this.setState({
      [name]: event.target.value,
    });   


    
   
    //end of swich case
  };

  


  
  
 
  render() {

    
    const { classes, dataForm, submitting } = this.props;
    const isLoad = (this.state.isLoad ? 'is-loading': '')
    return ( 
      <form className={classes.container}  onSubmit={this.handleSubmit}  autoComplete="off">
           <TextField
          id="select-data"
          select
          label="กรุณาเลือกคำนำหน้า"
          className={classes.textField}
          value={this.state.prefxtitle}
          onChange={this.handleChange('prefxtitle')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="เลือกคำนำหน้าของคุณ"
          margin="normal"
        >
        
        
          {prefxtitle.map(option => (
            <MenuItem   key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          helperText="ป้อน ชื่อของคุณ"
          id="firstname"
          label="ชื่อ"
          className={classes.textField}
          value={this.state.first_name}
          onChange={this.handleChange('first_name')}
          margin="top:0"
        />
        <TextField
          required
          id="lastname"
          helperText="กรุณาป้อน นามสกุลของคุณ"
          label="นามสกุล"
          value={this.state.last_name}
          className={classes.textField}
          onChange={this.handleChange('last_name')}
          margin="normal"
        />
       <FormControl component="fieldset" required className={classes.formControl}>
          <FormLabel component="legend">Gender </FormLabel>
          <RadioGroup name="Gender"
            value={this.state.gender}
            onChange={this.selectgender}
            className={classes.group}
          >
          {gender.map(option =>(
                <FormControlLabel  id={option.value} value={option.value} control={<Radio />}  label={option.value} />            
          ))}
        
        </RadioGroup>
        </FormControl> 
        <TextField
          required
          id="affiliation"
          label="สังกัด"
          helperText="กรุณาป้อน สังกัด หรือ หน่วยงานของคุณ"
          className={classes.textField}
          value={this.state.affiliation}
          onChange={this.handleChange('affiliation')}
          margin="normal"
        />
         <TextField
          required
          id="address"
          label="ที่อยู่ปัจจุบัน"
          value={this.state.address}
          onChange={this.handleChange('address')}
          className={classes.textField}
          margin="normal"
          
        />
        <TextField
          required
          id="city"
          label="ตำบล"
          value={this.state.city}
          onChange={this.handleChange('city')}
          className={classes.textField}
          margin="normal"
          
        />
         <TextField
          required
          id="district"
          label="อำเภอ "
          value={this.state.district}
          className={classes.textField}
          onChange={this.handleChange('district')}
          margin="normal"
        />
         <TextField
          required
          id="province"
          label="จังหวัด "
          value={this.state.province}
          className={classes.textField}
          onChange={this.handleChange('province')}
          margin="normal"
        />
        <TextField
          required
          id="postal"
          label="รหัสไปรษณีย์"
          value={this.state.postal}
          className={classes.textField}
          onChange={this.handleChange('postal')}
          margin="normal"
        />
       
        <TextField
          required
          id="email"
          label="อีเมล"
          type="email"
          value={this.state.email}
          className={classes.textField}
          onChange={this.handleChange('email')}
          helperText="กรุณาป้อนอีเมลของคุณให้ถูกต้อง ยกตัวอย่าง example@email.com"
          margin="normal"  
         
          onFocus={this.handleChange('email')}
        />
        <TextField
          required
          label="ยืนยันอีเมล"
          type="email"
          value={this.state.confirm_email}
          className={classes.textField}
          helperText={this.state.confirm_email == this.state.email? "ยืนยันอีเมลของคุณอีกครั้ง":"กรุณาป้อนอีเมล ให้ตรงกันทั้งสองฟิลด์"}
          onChange={this.handleChange('confirm_email')}
          margin="normal"
          error={this.state.confirm_email == this.state.email? false:true}
        />
          <TextField
          required
          label="บัญชีผู้ใช้"
          type="text"
          value={this.state.username}
          className={classes.textField}
          helperText="กรุณาป้อนปัญชีผู้ใช้"
          onChange={this.handleChange('username')}
          margin="normal"
       
        />
         <TextField
          required
          label="รหัสผ่าน"
          type="password"
          value={this.state.password}
          className={classes.textField}
          helperText= "กรุณาป้อนรหัสผ่าน"
          onChange={this.handleChange('password')}
          margin="normal"
        />
        <TextField
          required
          label="ยืนยันรหัสผ่าน"
          type="password"
          value={this.state.confirm_password}
          className={classes.textField}
          helperText={this.state.confirm_password == this.state.password? "ยืนยันรหัสผ่านของคุณอีกครั้ง":"กรุณาป้อนรหัสผ่าน ให้ตรงกันทั้งสองฟิลด์"}
          onChange={this.handleChange('confirm_password')}
          margin="normal"
          error={this.state.password == this.state.confirm_password? false:true}
        />
      <button  className={"button is-larges is-orange "+isLoad} type="submit" ><i className="material-icons md-24">submit</i></button>
      
      </form>
    );
  }
}


TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TextFields);
// handleChange = name => event => {
    
//   this.setState({
//     [name]: event.target.value,
//   });   