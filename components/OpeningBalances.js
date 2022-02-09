
import React from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import $ from "jquery";
// import   './signup/index.js'

import { Tabs } from 'antd';

import data from './demo-data.js';
import { Modal, Button,message,Progress } from 'antd';
import SpicyDatatable from 'spicy-datatable';

const { columnsCashbook,columnsBank,customOptions,columnFixedassets,columnsOpenBalances} = data;
// import { StepThree } from './signup/stepthree'
// import { StepFour } from './signup/stepfour'
// import { StepFive } from './signup/stepfive'
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

let totOpenBalance=[]

 var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var year = today.getFullYear();
 if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }

 var today_now = dd+'-'+mm+'-'+year;


 var today_now_ddd = year+'-'+mm+'-'+dd;



export class OpeningBalances extends React.Component {
	constructor(props){
		super(props);
		this.state={
		  firstName:'',
       documents: [],
       groupList:[],
       fixedAssets:[],
       radio:'',

       documents2: [],
       groupList2:[],
       balanceSheet:[],
       openBalances:[],
       ledgers:[],
		  lastName:'',
		  email:'',
		  emailconf:'',
      gender:'',
      dob:'',
      phone:'',

      placeOfbirth:'',
      homeTown:'',
      residence:'',
      landmark:'',
      index:'',
      leg_id:'',
      visible: false,
      visible2: false,
      text:''




        }
        // this.bankreceiptBtn=this.bankreceiptBtn.bind(this);
        //   this.add = this.add.bind(this);
        //  this.remove = this.remove.bind(this);

        //    this.addbp= this.addbp.bind(this);
        this.radioOneclick = this.radioOneclick.bind(this);
         this.radioTwoclick = this.radioTwoclick.bind(this);
         this.getProfitLoss = this.getProfitLoss.bind(this);
          this.getBalanceSheet_ledgers = this.getBalanceSheet_ledgers.bind(this);
         this.onFormSubmit=this.onFormSubmit.bind(this);

          this.getFixedAssets=this.getFixedAssets.bind(this);
        this.onChangeRemark=this.onChangeRemark.bind(this);
        this.onSelectRowfixedAssets=this.onSelectRowfixedAssets.bind(this)
          this.saveFixedAsset=this.saveFixedAsset.bind(this)
          this.cancelFixedasset=this.cancelFixedasset.bind(this);
          this.onSelectRowOpenBalance=this.onSelectRowOpenBalance.bind(this);
          this.editCell_debit=this.editCell_debit.bind(this)
          this.editCell_credit=this.editCell_credit.bind(this)
          this.evaluateData=this.evaluateData.bind(this)
	}

  componentDidMount(){
   // this.getLedgers();
   // this.getFixedAssets();
    this.getBalanceSheet_ledgers();
  }


 showModal = () => {
    this.setState({
      visible: true,
    });
  };



  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,visible2:false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,visible2:false
    });
  };

//
	addStage(object){
		this.setState({firstStage:object});
		//console.log(this.state);
	}


  bankreceiptBtn(){
      $("#bankreceiptUi").css("display","block");
       $("#bankpaymentUi").css("display","none");
  }

  bankpaymentBtn(){
       $("#bankpaymentUi").css("display","block");
       $("#bankreceiptUi").css("display","none");
  }





changeInfo(){
     let group1=$("#bank_account_br option:selected").val();
     if(group1=='Bank'){
         $("#bankDetails").css("display","block");
     }
     if(group1=='Cash'){

          $("#bankDetails").css("display","none");
     }

     if(group1=='Choose options'){

          $("#bankDetails").css("display","none");
     }
}

onFormSubmit(e){
  e.preventDefault();

  var date_p=$("#date_p").val();
  var item=$("#item").val();

   let classification=$("#classification option:selected").val();

  var cost=$("#cost").val();
   var receipt_num=$("#receipt_num").val();
    var serial_num=$("#serial_num").val();
     var label=$("#label").val();
     var location=$("#location").val();



      axios.post('http://localhost:4000/api/addFixedAssetsreg',{date_p: date_p,item:item,
      classification:'',cost:cost,receipt_num:receipt_num,serial_num:serial_num,label:label,location:location})
     .then(response => {

            alert('Asset Added');
                   this.getFixedAssets();



    }).catch(function (error) {
        console.log(error);
        alert('Data not saved')


    })


          // axios.post('http://localhost:4000/api/checkLedgers',{code_ld: code})
          //  .then(response => {
          //   console.log(response);


          //          if(response.data.Data==='Match'){
          //             alert('Ledger code exist');
          //          }else{
          //               sendData();
          //          }

          // }).catch(function (error) {
          //     console.log(error);


          // })


}

  descriptionKeyup(){
  var description=$("#description").val();

    if(description!==''){


       axios.post('http://localhost:4000/api/checkLedgersDescrip',{description: description})
           .then(response => {
            console.log(response);


                   if(response.data.Data==='Match'){
                         $("#checker").css("color","red");
                      $("#checker").text('Data already exist');
                   }else{
                      $("#checker").text('');
                   }

          }).catch(function (error) {
              console.log(error);


          })
    }else{
        $("#checker").text('');
    }
  }



        radioOneclick(){

           if($('#inlineRadio1').is(':checked')) {
            this.setState({radio:'Income Statement'});
              this.getProfitLoss();
            }
        }


         radioTwoclick(){

           if($('#inlineRadio2').is(':checked')) {
             this.setState({radio:'Balance Sheet'});
              this.getBalanceSheet();
            }
        }


    getBalanceSheet_ledgers(){
      
      
      
       axios.get('/api/accounts/getOpeningBalance')
           .then(response => {

             const rowsWithCallback= response.data.map((r,index) => {
                    let save_cell="save"+''+index;
                    let delete_cell="delete"+''+index;

                     let cell_name_debit="cell_name_debit"+index;
                     let cell_name_credit="cell_name_credit"+index;

                      let save_btn="save_btn"+''+index;

                   // let name_cell="changeCellname"+''+index;


                    let parse_code_description= JSON.parse(r.code_description)
                  //  console.log("parse_code_description",parse_code_description)

                      let parse_debit=JSON.parse(r.debit);
                      let parse_credit=JSON.parse(r.credit);

                      let nameT=parse_code_description;

                        var mmy= Object.assign({}, r,{
                         // code:r.code,
                           leg_id:r.leg_id,
                          code_description:nameT,
                          date_added:r.date_added,
                          debit: <div className="col-md-12" key={r}>


                                            <div className=" ">

                                              <input type="number" min="0"  defaultValue={parse_debit} className="form-control" name={nameT} placeholder="debit" htmlFor={r.type} onChange={this.editCell_debit} id={cell_name_debit}
                                                 />
                                          </div>
                                      </div>,
                          credit: <div className="col-md-12">


                                            <div className=" ">

                                              <input type="number" min="0" placeholder="" defaultValue={parse_credit} className="form-control" name={nameT} htmlFor={r.type} placeholder="credit" onChange={this.editCell_credit} id={cell_name_credit}
                                                 />
                                          </div>
                                      </div>,




                                  })
                                 return mmy;

                            });

     this.setState({ ...this.state,openBalances:rowsWithCallback});



             //     let balance_sheet = response.data.map((r,index) => (
             //      <option key={r.b_s_id} value={r.name}>{r.name}</option>

             //        )

             //      );

             // this.setState({ledgers:balance_sheet});


            }).catch(function (error) {
              console.log(error);


            })
     }

      getProfitLoss(){
           axios.get('http://localhost:4000/api/getProfitLoss')
              .then(response => {


                 let p_l = response.data.map((r,index) => (
                  <option key={r.p_l} value={r.name}>{r.name}</option>

                    )

                  );

              this.setState({ledgers:p_l});


            }).catch(function (error) {
              console.log(error);


            })
     }


editMgDate(e){
  let changevalue=$('#date_mg_name'+this.state.stepone.index).val();
  console.log("changevalue_description_name",changevalue);

  $('#save_btn_marriagesBlessed'+this.state.stepone.index).css("display","inline-block");

}

editMgBridegroom(e){
    let changevalue=$('#editbridegroomname_mg_name'+this.state.stepone.index).val();
    console.log("changevalue_description_name",changevalue);

    $('#save_btn_marriagesBlessed'+this.state.stepone.index).css("display","inline-block");

}

editMgBride(e){
    let changevalue=$('#editbridename_mg_name'+this.state.stepone.index).val();
    console.log("changevalue_description_name",changevalue);

    $('#save_btn_marriagesBlessed'+this.state.stepone.index).css("display","inline-block");

}

editMgBrideMaiden(e){
    let changevalue=$('#editbridemaidenname_mg_name'+this.state.stepone.index).val();
    console.log("changevalue_description_name",changevalue);

    $('#save_btn_marriagesBlessed'+this.state.stepone.index).css("display","inline-block");

}

editMgMinister_name(e){
let changevalue=$('#editMinistername_mg_name'+this.state.stepone.index).val();
console.log("changevalue_description_name",changevalue);

$('#save_btn_marriagesBlessed'+this.state.stepone.index).css("display","inline-block");

}

editMgDescription(e){
let changevalue=$('#description_mg_name'+this.state.stepone.index).val();
console.log("changevalue_description_name",changevalue);

$('#save_btn_marriagesBlessed'+this.state.stepone.index).css("display","inline-block");

}

onChangeRemark(e){
  e.preventDefault();


    let cell_name=$('#changeBind'+this.state.stepone.index).children("option:selected").text();
      let subgroup_id=$('#changeBind'+this.state.stepone.index).children("option:selected").val();

      console.log("call_na",cell_name)
      console.log("subgroup_id",subgroup_id)

      // cell_subgroupArry.push(cell_name,subgroup_id)


}

editCell_debit(e){
  console.log("editCell_debit")
let changevalue=$('#cell_name_debit'+this.state.index).val();
let debit_credit=$('#cell_name_debit'+this.state.index).attr('placeholder');
let name=$('#cell_name_debit'+this.state.index).attr('name');

let obj={name:name+'_'+debit_credit,debit_credit:debit_credit,value:changevalue};




totOpenBalance.push(obj);

 //  let fin_totOpenBalance =Object.assign({}, ...totOpenBalance,obj);
 // console.log("fin_totOpenBalance",fin_totOpenBalance);

//$('#save_btn'+this.state.stepone.index).css("display","inline-block");

}
editCell_credit(){
  console.log("editCell_credit")
let changevalue=$('#cell_name_credit'+this.state.index).val();
let debit_credit=$('#cell_name_credit'+this.state.index).attr('placeholder');
let name=$('#cell_name_credit'+this.state.index).attr('name');

let obj={name:name+'_'+debit_credit,debit_credit:debit_credit,value:changevalue};


totOpenBalance.push(obj);

//   let fin_totOpenBalance =Object.assign({}, ...totOpenBalance);

// console.log("fin_totOpenBalance",fin_totOpenBalance)
}

evaluateData(){
  this.showModal();
totOpenBalance.length=0;
  let allDebit=[];
  let allCredit=[];
  // const fin_OpenBalance = this.state.openBalances.map((r) => (Object.assign({}, r,atten)));

  let open=this.state.openBalances.map((r,index)=>{

          let changevalue_credit=$('#cell_name_credit'+index).val();
          let changevalue_debit=$('#cell_name_debit'+index).val();
          // console.log("changevalue ",changevalue)
          let debit_credit=$('#cell_name_credit'+index).attr('placeholder');

           let for_type=$('#cell_name_credit'+index).attr('for');

          let name=$('#cell_name_credit'+index).attr('name');

          //let obj={name:name+'_'+debit_credit,debit_credit:debit_credit,value:changevalue};


          // //
          // let changevalue2=$('#cell_name_debit'+index).val();
          // let debit_credit2=$('#cell_name_debit'+index).attr('placeholder');
          // let name2=$('#cell_name_debit'+index).attr('name');

          let obj2={id:r.leg_id,name:name,debit_credit:debit_credit,debit:changevalue_debit,credit:changevalue_credit,type:for_type};


            //totOpenBalance.push(obj);
            totOpenBalance.push(obj2)

          return totOpenBalance;


      // if(r.debit_credit=='debit'){
      //   allDebit.push(r.value);
      // }
  })
  console.log("open",open)

   let unique2= [...new Set(open)];
   console.log("unique2",unique2[0])

         let open2=unique2[0].map((r,index)=>{
            //if(r.debit_credit=='debit'){

              allDebit.push(parseFloat(r.debit))
              console.log("allDebit",allDebit)
            //}
           // if(r.debit_credit=='credit'){
              allCredit.push(parseFloat(r.credit))
            //   console.log("allDebit",allDebit)
            // }

         });


          var sum_all_Debit = allDebit.reduce((x, y) => x + y);
             var total_all_Debit=(sum_all_Debit).toFixed(2);

             console.log("total_all_Debit",total_all_Debit)

             var sum_all_Credit = allCredit.reduce((x, y) => x + y);
             var total_all_Credit=(sum_all_Credit).toFixed(2);

             console.log("total_all_Credit",total_all_Credit)

             let difference=total_all_Credit-total_all_Debit;
             if(difference<0){
              //difference=difference.substring(1)
             }

             if(total_all_Credit>total_all_Debit){
              console.log("total_all_Credit greater",total_all_Credit)

              this.setState({
                visible: true,
                text:<div>

                <b style={{fontWeight:800,color:'red'}}>Debit & Credit mismatch</b><br/><b style={{fontWeight:800}}>Total Credit: {total_all_Credit}</b><br/> <b style={{fontWeight:800}}>Total Debit: {total_all_Debit}</b><br/> <b style={{fontWeight:800}}>Difference:{difference}</b></div>
              });

             }
             if(total_all_Debit>total_all_Credit){
              console.log("total_all_Debit greater",total_all_Credit)
              this.setState({
                visible: true,
                text:<div>

                <b style={{fontWeight:800,color:'red'}}>Debit & Credit mismatch</b><br/><b style={{fontWeight:800}}>Total Credit: {total_all_Credit}</b><br/> <b style={{fontWeight:800}}>Total Debit: {total_all_Debit}</b><br/> <b style={{fontWeight:800}}>Difference:{difference}</b></div>
              });
             }
            if(total_all_Debit==total_all_Credit){


                 console.log("equal",total_all_Debit +''+total_all_Credit);

                let starting_date= $("#starting_date").val()
                  if(starting_date!==''){

                      this.setState({
                        visible: false,
                      });
                      const key = 'updatable';
                      message.loading({ content: 'Saving...', key,duration:10000 });

                      axios.post('/api/accounts/saveOpenBalances',{groupList:unique2[0],date_br:starting_date})
                      .then(response => {
                        console.log("saved Opening Balances",response);

                        if(response.data=='done'){
                           //alert('Saved');
                            // this.setState({
                            //   visible: false,
                            //   //visible2:true
                            // });
                           
                            setTimeout(() => {
                              message.success({ content: 'Saved', key, duration: 2 });
                            }, 1000);

                            this.getBalanceSheet_ledgers();

                          //this.getFixedAssets();
                        }

                      })
                      .catch(function (error) {
                        console.log(error);
                      })

                  }else{
                   // alert('Please choose date.')
                    this.setState({
                        visible: false,

                      });
                   message.error('Please choose date.');
                  }

             }


}
saveFixedAsset(){

   let value=$('#changeBind'+this.state.stepone.index).val();
 //  let description=$('#p_r_description'+this.state.stepone.index).val();

    console.log("value",value);


     axios.post('http://localhost:4000/api/updateFixedAsset_save',{remark:value,p_id:this.state.stepone.user_id})
                .then(response => {
                  console.log("saveCell",response);

                  if(response.data=='done'){
                     $("#load_add_fixed").fadeIn('slow').delay(1000).fadeOut('slow');

                    $("#results_add_fixed_assets").css("backgroundColor","green");
                    $("#results_add_fixed_assets").css("color","white");
                    $("#results_add_fixed_assets").html("Updated successfully");
                    $("#results_add_fixed_assets").delay(3000).fadeIn('slow').delay(5000).fadeOut('slow');

                    this.getFixedAssets();
                  }
                   //this.setState({ backsliderspinned: response.data });




                })
                .catch(function (error) {
                  console.log(error);
                })
}

cancelFixedasset(){

   let value=$('#changeBind'+this.state.stepone.index).val();
 //  let description=$('#p_r_description'+this.state.stepone.index).val();

    console.log("value",value);


     axios.post('http://localhost:4000/api/updateFixedAsset_cancel',{remark:value,p_id:this.state.stepone.user_id})
                .then(response => {
                  console.log("saveCell",response);

                  if(response.data=='done'){
                   $("#load_add_fixed").fadeIn('slow').delay(1000).fadeOut('slow');

                    $("#results_add_fixed_assets").css("backgroundColor","orange");
                    $("#results_add_fixed_assets").css("color","white");
                    $("#results_add_fixed_assets").html("Updated successfully");
                    $("#results_add_fixed_assets").delay(3000).fadeIn('slow').delay(5000).fadeOut('slow');
                      this.getFixedAssets();
                  }
                   //this.setState({ backsliderspinned: response.data });




                })
                .catch(function (error) {
                  console.log(error);
                })
}





  getFixedAssets(){

      var that=this;
      axios.get('http://localhost:4000/api/getFixedAssets')
           .then(res2 => {
            console.log("getFixedAssets",res2);



            const rowsWithCallback= res2.data.map((r,index) => {
                   let changeBind="changeBind"+''+index;

                    let date_p="date_p"+''+index;
                     let item="item"+''+index;
                   let classification="classification"+''+index;
                   let cost="cost"+''+index;
                   let receipt_num="receipt_num"+''+index;
                   let serial_num="serial_num"+''+index;
                   let label="label"+''+index;
                    let location="location"+''+index;





                         var mmy= Object.assign({}, r,{

                                              action:
                                                <div className="row">
                                                <div >
                                                      <div className="col-md-4">
                                                          <select className="form-control" id={changeBind} onChange={that.onChangeRemark} >
                                                          <option >Choose State</option>
                                                           <option >Good</option>
                                                            <option >Disposed</option>
                                                             <option >Spoiled</option>
                                                              <option >Missing</option>


                                                          </select>
                                                      </div>
                                                        <div className="col-md-4">
                                                             <button   onClick={that.saveFixedAsset} className="btn btn-success">save</button>
                                                        </div>

                                                         <div className="col-md-4">
                                                             <button   onClick={that.cancelFixedasset} className="btn btn-danger">Cancel</button>
                                                        </div>
                                                  </div>
                                                </div>


                          })
                         return mmy;

                         });


            this.setState({fixedAssets:rowsWithCallback});
               // var that=this;
             // if(year_g==paramyear){
             //     $("#avgcommunionsunmornigatt_current").text(res2.data.datab);
             // }else{
             //     $("#avgcommunionsunmornigatt_previous").text(res2.data.datab);
             // }
         // console.log("saveCommunicants",res2)

            }).catch(function (error) {
              console.log(error);


            })

  }
onSelectRowfixedAssets(e, row, index) {



console.log("row",row);


    this.setState({

                  index:index,
                  user_id:row.id,



    })

  }


onSelectRowOpenBalance(e, row, index) {

this.setState({


              index:index,
              leg_id:row.subgroup_id,

                // baptised:row.baptised,
                // memBaptised_water:row.water_baptised,
                // communicant:row.communicant



})



$('#u_id').val(row.subgroup_id);

  }


  render() {

// $(".spicy-datatableoptions-sizepicker").css("display","none");
// $(".spicy-datatableoptions-search--label").css("display","none");
// $(".spicy-datatable-counter").css("display","none");
// $(".spicy-datatable-pagination-root").css("display","none");






    const { demo, clickDebugger,fixedAssetsList,fixedAssets,openBalances} = this.state;

          const rowsWithCallbackfixedAssets =fixedAssets.map((r) => (Object.assign({}, r, { onClickHandler: this.onSelectRowfixedAssets })));

           let rowsWithCallbackOpen_Balances= openBalances.map((r) => (Object.assign({}, r, { onClickHandler: this.onSelectRowOpenBalance })));

    return (




        <div className="col-md-12" style={{background:'white'}}>






                     <div className="col-md-12">
                     <h4 style={{color:'white'}}>NB: Make sure Opening Balances for ledgers are equal</h4>

                          <h3 className="col-md-12">Register Opening Balances</h3>

                       <br/>
                        <hr/>
                        <div>

                          <label>Choose Starting Date </label>
                                        <div className="form-group">

                                          <input type="date" max={today_now_ddd} className="form-control"  id="starting_date" required/>

                                        </div>
                        </div>

                    <div className="col-md-12">
                <img alt="" src="img/loader.gif" width="40"  id="load_add_fixed" className="img-responsive center-block" style={{display: 'none'}}/>
                  <div id="results_add_fixed_assets"  className="text-center" style={{display:'none'}}></div>
                          </div>
                                <SpicyDatatable tableKey="demo-table-genral" columns={columnsOpenBalances} rows={rowsWithCallbackOpen_Balances} config={{ showDownloadCSVButton: false,itemsPerPageOptions:[200,400]}}/>


                            <button className="btn btn-success" style={{width:'100%'}} onClick={this.evaluateData}>Evaluate & Save</button>
                        </div>

                        <Modal
                          title="SUBMISSION FAILED"
                          visible={this.state.visible}
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                        >
                          {this.state.text}
                        </Modal>

                         <Modal
                          title="Basic Modal"
                          visible={this.state.visible2}
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}

                          footer={[
                            <Button key="cancel" type="danger" onClick={this.handleCancel}>
                              Cancel
                            </Button>,
                            <Button key="save" type="primary"  onClick={this.handleOk}>
                              Save
                            </Button>,
                          ]}
                        >
                          <p><Progress type="circle" percent={100} /> Debit and Credit Matches click Save to proceed</p>

                        </Modal>

              </div>




    )
  }
}



