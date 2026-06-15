class calculate {
  /**
   @param {number} z0: Generator's characteristic Impedance
   @param {number} {Zin_real, Zin_imag}: Impedance at input of parallel combination
   @returns {object} {gamma, vswr }
   */
  static calculateVSWR(Z0, Zin_real, Zin_imag) {
    if (!Z0 || Number.isNaN(Z0) 
        || Number.isNaN(Zin_real) 
        || Number.isNaN(Zin_imag)) {
    throw new Error(
    "calculateVSWR;one or more values of impedance or load  are invalid.");
  }
    // const ro = Z0;
    // const zL_real = Zin_real;
    // const zL_imag = Zin_imag;
    // const numeratorReal =    zL_real - ro;
    // const numeratorImag = zL_imag;
    // const denominatorReal =    zL_real + ro;
    // const denominatorImag = zL_imag;
    const numeratorReal =  Zin_real - Z0;
    const numeratorImag = Zin_imag;
    const denominatorReal =  Zin_real + Z0;
    const denominatorImag = Zin_imag;
 
    const numeratorMag = Math.hypot(numeratorReal, numeratorImag);
    const denominatorMag = Math.hypot(denominatorReal, denominatorImag);
    const gamma = numeratorMag / denominatorMag;
  const vswr = (1 + gamma) / (1 - gamma);
  return {
    gamma: gamma,
    vswr: vswr,
    reflection_module: gamma,
  };
}
}
export {calculate}; 