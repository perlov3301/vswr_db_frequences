// import { inputZ } from './parallel_zin.js';
import { timenow } from './timenow.js';
// import { calculate } from './calculateVSWR.js';
import { f1 } from './vswr1_db1.js'
import { table_f_n }   from './table_f_n.js';
document.addEventListener("readystatechange", () => {
    console.log("document.readyState:", document.readyState);
    const explanationArea= document.getElementById("explanation");
    explanationArea.value = `Current readyState: ${document.readyState}\n`;
    // explanationArea.value+= "explanationArea is ready\n";
    // console.clear();
    const vf=1;
    // let vf=1;
    let inputIds_f= [];
    let inputIds_ZL2_real= [];
    let inputIds_ZL2_imag= [];
    let f_array= [];
    let ZL2_real_array= [];
    let ZL2_imag_array= [];
    let Zin_parallel_real_array= [];
    let Zin_parallel_imag_array= [];
    let vswr_array= [];
    let db_array= [];
    const tbody = document.getElementById("frequencyTableBody");
    tbody.replaceChildren("");
    const form= document.getElementById("vswrForm");
    const generatorR= document.getElementById("generatorR");
    const frequency_n_input= document.getElementById("frequency_n");
    frequency_n_input.addEventListener("input", ()=>{
      tbody.replaceChildren(""); });
    const f_n= parseInt(frequency_n_input.value,10);
    const table_ids=table_f_n.addRows("frequencyTableBody", 
          f_n, 
          "frequency", 
          "load_real", 
          "load_imag");
    inputIds_f= table_ids.id_array_f;
    inputIds_ZL2_real= table_ids.id_array_r;
    inputIds_ZL2_imag= table_ids.id_array_x;
    // inputIds_f= ["frequency1", "frequency2", ];
    // inputIds_ZL2_real= ["load_real1", "load_real2", ];
    // inputIds_ZL2_imag= ["load_imag1", "load_imag2", ];
    //0   frequency1   load_real1   load_imag1
    //1   frequency2   load_real2   load_imag2
    // const frequency1Input= document.getElementById(inputIds_f[0]);
    // const load_real1= document.getElementById(inputIds_ZL2_real[0]);
    // const load_imag1= document.getElementById(inputIds_ZL2_imag[0]);
    // const frequency2Input= document.getElementById(inputIds_f[1]);
    // const load_real2= document.getElementById(inputIds_ZL2_real[1]);
    // const load_imag2= document.getElementById(inputIds_ZL2_imag[1]);

    const line1_R= document.getElementById("line1_R");
    const line2_R= document.getElementById("line2_R");
    const line1_L= document.getElementById("line1_L");
    const line2_L= document.getElementById("line2_L");
    
    // const resultDiv= document.getElementById("result");
    const result_vswr= document.getElementById("result_vswr");
    const statusIndicator= document.getElementById("statusIndicator");

    statusIndicator.replaceChildren("ready");
    let currentState= "ready";
    function setState(state) {
      // currentState= state;
      // let captions=[];
      // captions[0]= {
      //   ready: "ready for input",
      //   modified: "Input changed",
      //   submitted: "Calculated",
      //   calculatedZin: "Zin was calculated",
      //   error_calculating: "error calculating Zin or VSWR",
      //   calculatedVSWR: "VSWR was calculated",
      // };
      // captions[1]= {
      //   ready: "ready for input",
      //   modified: "Input changed",
      //   submitted: "Calculated",
      //   calculatedZin: "Zin was calculated",
      //   error_calculating: "error calculating Zin or VSWR",
      //   calculatedVSWR: "VSWR was calculated",
      // };
      // statusIndicator.textContent= captions[state] || state;
      // statusIndicator.className= `status-indicator ${state}`;
    }
    function formatNumber(value) {
      return Number.isFinite(value) ? 
          value.toFixed(3): "N/A";
    }

    
    function updateResult() {
    console.clear();
      try {
        const Z0=  parseFloat(generatorR.value);
        // const f_n= parseInt(frequency_n_input.value,10);
        console.log("updateResult; Z0:", Z0, " f_n:", f_n);

        for (let i=0; i< f_n; i++) {
          const frequencyInput= document.getElementById(inputIds_f[i]);
          const load_real= document.getElementById(inputIds_ZL2_real[i]);
          const load_imag= document.getElementById(inputIds_ZL2_imag[i]);
          f_array[i]= parseFloat(frequencyInput.value);
          ZL2_real_array[i]= parseFloat(load_real.value);
          ZL2_imag_array[i]= parseFloat(load_imag.value);
        } 
       
        const Z01= parseFloat(line1_R.value);
        const Z02= parseFloat(line2_R.value);
        const length1= parseFloat(line1_L.value);
        const length2= parseFloat(line2_L.value);
        console.log("updateResult; Z01:", Z01, " length1:", length1);
        console.log("updateResult; Z02:", Z02, " length2:", length2);
        result_vswr.textContent= "";
        
        for (let i=0; i< f_n; i++) {
          const frequency= f_array[i];
          const ZL2_real= ZL2_real_array[i];
          const ZL2_imag= ZL2_imag_array[i];
          
          console.log("updateResult; frequency:", frequency);
          console.log("updateResult; ZL2_real:", ZL2_real," ZL2_imag:", ZL2_imag);
  
          const vswrData= f1.vswr1_db1(
              Z0, 
              frequency, ZL2_real, ZL2_imag,
              Z01, Z02, length1, length2,
              vf 
          );
          if (!vswrData || vswrData.vswr === Infinity || vswrData.vswr<1. || vswrData.db > 0) {
            throw new Error("updateResult;Invalid vswrData returned from vswr1_db1.");
          }
          if (vswrData.vswr < 2)                         { vswr_array[i]= +vswrData.vswr.toFixed(3); } 
          else if (vswrData.vswr>=2 && vswrData.vswr<6)  { vswr_array[i]= +vswrData.vswr.toFixed(2); }
          else if (vswrData.vswr>=6 && vswrData.vswr<24) { vswr_array[i]= +vswrData.vswr.toFixed(1); }
          else                                           { vswr_array[i]= +vswrData.vswr.toFixed(0); }
          
          if (vswrData.db > -1.)                         { db_array[i]= +vswrData.db.toFixed(3); } 
          else if (vswrData.db<=-1. && vswrData.db>-5.)  { db_array[i]= +vswrData.db.toFixed(2); }
          else if (vswrData.db<=-5. && vswrData.db>-21.) { db_array[i]= +vswrData.db.toFixed(1); }
          else                                           { db_array[i]= +vswrData.db.toFixed(0); }
          
          const g=   formatNumber(vswrData.gamma);
          const vswr=formatNumber(vswrData.vswr);
          const db=  formatNumber(vswrData.db);
          const spaces = " ".repeat(3);
          result_vswr.textContent+= `f= ${frequency}MHz${spaces}vswr: ${vswr_array[i]} 
             (|Γ| = ${vswrData.gamma.toFixed(4)}) db= ${db_array[i]} dB \n`;
          console.log("updateResult; vswr:", vswr_array[i]," |Γ|:",g," db:", db_array[i]);
          
      }
        console.log("updateResult;f:",f_array," vswr_array:", vswr_array, " db_array:", db_array);

      } catch (error) {
        result_vswr.textContent = "parallel_vswr;Error of calculations .";
        explanationArea.value = error.message;
        setState("updateResult;error_calculating");
      }
    }
    //end of updateResult

    function markModified() {
      if (currentState !== "modified") { // setState("modified");
      } 
    }
    function markSubmitted() {
      if (currentState == "submitted") {}
        
    }

    // generatorR.addEventListener("input", markModified);
    // frequency1Input.addEventListener("input", markModified);
    // load_real1.addEventListener("input", markModified);
    // load_imag1.addEventListener("input", markModified);
    line1_R.addEventListener("input", markModified);
    line1_L.addEventListener("input", markModified);
    line2_R.addEventListener("input", markModified);
    line2_L.addEventListener("input", markModified);


    form.addEventListener("submit", (event) => {
      event.preventDefault();
      updateResult();
    });

    setState(`time now: ${timenow()}; ready for input `);
});

