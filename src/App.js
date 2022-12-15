import logo from './logo.svg';
import { useEffect, useState } from 'react';
const mathsteps = require('mathsteps');

function App() {
  const [exprs, setExprs] = useState([
    { key: 'x', val: '2x+1' },
    { key: 'g', val: 'g+1' },
  ]);
  const [resultSteps, setResultSteps] = useState([]);
  const [invalid, setInvalid] = useState(false);

  // useEffect(() => {
  //   const steps = mathsteps.simplifyExpression('2(x+1)');
  //   steps.forEach((step) => {
  //     console.log('before change: ' + step.oldNode.toString()); // before change: 2 x + 2 x + x + x
  //     console.log('after change: ' + step.newNode.toString()); // after change: 6 x
  //     console.log('# of substeps: ' + step.substeps.length); // # of substeps: 3
  //   });
  // }, []);

  function combineFunctions(functions) {
    let first = functions[0];
    let equation = first.val;
    if (functions.length === 1) {
      return equation;
    } else {
      functions.splice(0, 1);
      return equation.replace(first.key, `(${combineFunctions(functions)})`);
    }
  }

  function solve() {
    let valid = true;
    exprs.forEach((expr) => {
      if (!expr.val.includes(expr.key)) valid = false;
    });
    if (valid) {
      const result = combineFunctions([...exprs]);
      const steps = mathsteps.simplifyExpression(result);
      if (steps.length === 0) {
        setInvalid(true);
      } else {
        setResultSteps(steps);
        steps.forEach((step) => {
          console.log('before change: ' + step.oldNode.toString()); // before change: 2 x + 2 x + x + x
          console.log('after change: ' + step.newNode.toString()); // after change: 6 x
          console.log('# of substeps: ' + step.substeps.length); // # of substeps: 3
        });
      }
    } else setInvalid(true);
  }

  return (
    <div className="app">
      <div className="mobile">
        {invalid ? (
          <div className="alert-container" onClick={() => setInvalid(false)}>
            <div className="alert">
              <p className="alert__title">❌Error</p>
              <p className="alert__text">
                Pastikan ekspresi matematika yang anda masukan benar!
              </p>
              <p style={{ marginTop: 10 }}>
                (Klik dimana saja untuk menutup ini)
              </p>
            </div>
          </div>
        ) : null}

        <div className="container">
          <p className="title">Fungsi Komposit Solver</p>
          <div className="expressions">
            {exprs.map((expr) => {
              return (
                <div className="expression">
                  <p className="key">f({expr.key})</p>
                  <input
                    className="input"
                    value={expr.val}
                    onChange={(e) =>
                      setExprs((oldExprs) =>
                        oldExprs.map((oldExpr) => {
                          if (oldExpr !== expr) return oldExpr;
                          return { ...oldExpr, val: e.target.value };
                        })
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
          <div className="btns">
            <a className="btn" onClick={solve}>
              Lihat Hasil
            </a>
          </div>
          {resultSteps.length > 0 ? (
            <div className="result-container">
              <div>
                <p className="step" style={{ marginTop: 20 }}>
                  Cara mengerjakan
                </p>
                {resultSteps.map((step, index) => (
                  <>
                    <p className="step">
                      {index === resultSteps.length - 1
                        ? 'Hasil Akhir'
                        : `Langkah ${index + 1} :`}
                    </p>
                    {index === 0 ? (
                      <p className="solution">{step.oldNode.toString()}</p>
                    ) : null}
                    <p className="solution">{step.newNode.toString()}</p>
                  </>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
