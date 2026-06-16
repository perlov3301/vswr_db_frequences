class f1
{
/** 
 *   @param {number} Z0
   * @param {number} frequency - Frequency (Hz)
 *   @param {number} ZL2_real - real part of Load impedance  of branch 2 (ohms)
   * @param {number} ZL2_imag - imag part of Load impedance  of branch 2 (ohms)
     @param {number} Z01 - Characteristic impedance of transmission line 1 (ohms)
   * @param {number} Z02 - Characteristic impedance of transmission line 2 (ohms)
   * @param {number} length1(m) - Length of branch 1 (short circuit branch) (meters)
   * @param {number} length2(m) - Length of branch 2 (complex load branch) (meters)
   *
   * @param {number} vf - Velocity factor (default 1.0- free space like)
   * @returns {object} vswr and db for one frequency point
 * @returns 
 */
    static vswr1_db1(
      Z0, 
      frequency, ZL2_real, ZL2_imag,
      Z01, Z02, length1, length2,
        vf = 1.0
    ) 
    {
        if (Number.isNaN(Z0) || Number.isNaN(frequency) || 
            Number.isNaN(Z01) || Number.isNaN(Z02) || 
            Number.isNaN(length1) || Number.isNaN(length2) || 
            Number.isNaN(ZL2_real) || Number.isNaN(ZL2_imag) ) {
            throw new Error( "updateResult;enter valid numeric values for all inputs.");
       }
        const data = inputZ.parallelBranchesImpedance( // mm, MHz
          Z01,Z02, //ro of lines
          length1, length2, //mm length of lines
          ZL2_real, ZL2_imag, // Load for branch 2
          frequency, vf
        );
        const ZinImag= data.Zin_parallel.imag > 0 ? 
          `+ j${formatNumber(data.Zin_parallel.imag)}` : 
          `- j${formatNumber(-data.Zin_parallel.imag)}`;
        const Zin_str=`${formatNumber(data.Zin_parallel.real)} ${ZinImag} Ω`;
    //   resultDiv.textContent= `Zin= 
    //         ${formatNumber(data.Zin_parallel.real)} 
    //         ${ZinImag} Ω` 
    //       ;
          const Zin1= formatNumber(data.Zin1.imag);
          const Zin2_imag= data.Zin2.imag >= 0 ? 
          `+ j${formatNumber(data.Zin2.imag)}` : 
          `- j${formatNumber(-data.Zin2.imag)}`;
          const Zin2= ` ${formatNumber(data.Zin2.real)} ${Zin2_imag} Ω`;
    //   explanationArea.value= `` +
    //       `generator characteristic Impedance Z0=${Z0}Ω\n` +
    //       `Frequency: ${frequency}MHz; load ZL2=${ZL2_real}+${ZL2_imag}*j Ω\n` +
    //       `Zin1=j${Zin1}Ω \n` +
    //       `Zin2=${Zin2} \n` +
    //       `Resulting Zin= ${formatNumber(data.Zin_parallel.real)} ${ZinImag} Ω\n` 
        
    //       ;
      // setState("calculatedZin");
      const vswrData= calculate.calculateVSWR( // not dependent on frequency and Load
        Z0, 
        data.Zin_parallel.real, 
        data.Zin_parallel.imag);
        return {
            Zin1: { real: 0, imag: data.Zin1.imag},
            Zin2: { real: data.Zin2.real, imag: data.Zin2.imag },
            Zin_parallel: {
              real: data.Zin2.real,
              imag: data.Zin_parallel.imag,
            },
            gamma: vswrData.gamma,
            vswr: vswrData.vswr,
            db: vswrData.reflection_losses,
        }
    }
}
export {f1};