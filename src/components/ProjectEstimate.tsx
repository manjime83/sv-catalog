"use client";

import { useState } from "react";

export default function ProjectEstimate({
  price: p,
  fees: f,
  initialValues,
}: {
  price: number;
  fees: number;
  initialValues: { downPayment: number; interestRate: number; taxRate: number };
}) {
  const [price, setPrice] = useState(p);
  const [downPayment, setDownPayment] = useState(initialValues.downPayment * 100);
  const [interestRate, setInterestRate] = useState(initialValues.interestRate * 100);
  const [taxRate, setTaxRate] = useState(initialValues.taxRate * 100);
  const [insuranceRate, setInsuranceRate] = useState(50);

  const loanPeriod = 30 * 12;
  const loanAmmount = Math.round(price * (1 - downPayment / 10000));
  const payment = Math.round(
    interestRate === 0
      ? loanAmmount / loanPeriod
      : (loanAmmount * (interestRate / 12 / 10000) * Math.pow(1 + interestRate / 12 / 10000, loanPeriod)) /
          (Math.pow(1 + interestRate / 12 / 10000, loanPeriod) - 1)
  );

  const pmiRate = (175 + (loanAmmount > 726200 ? (downPayment < 500 ? 75 : 70) : downPayment < 500 ? 55 : 50)) / 2.5;
  const pmi = Math.round(downPayment < 2000 ? ((pmiRate / 10000) * loanAmmount) / 12 : 0);
  const taxes = Math.round((price * taxRate) / 10000 / 12);
  const insurance = Math.round((price * insuranceRate) / 10000 / 12);
  const fees = Math.round(f);

  return (
    <>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Precio de la propiedad</span>
              <span className="label-text-alt font-bold">
                {price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </span>
            </label>
            <input
              name="price"
              type="range"
              min={Math.round((p * 0.9) / 1000) * 1000}
              max={Math.round((p * 1.1) / 1000) * 1000}
              step={1000}
              value={price}
              className="range range-secondary range-sm"
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Cuota inicial</span>
              <div className="label-text-alt">
                <span className="px-5 font-bold">{downPayment / 100}%</span>
                <span>
                  {((price * downPayment) / 10000).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </label>
            <input
              name="downPayment"
              type="range"
              min={0}
              max={5000}
              step={50}
              value={downPayment}
              className="range range-secondary range-sm"
              onChange={(e) => setDownPayment(parseInt(e.target.value))}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Tasa de interes</span>
              <span className="label-text-alt font-bold">{interestRate / 100}%</span>
            </label>
            <input
              name="interestRate"
              type="range"
              min={0}
              max={1000}
              step={1}
              value={interestRate}
              className="range range-secondary range-sm"
              onChange={(e) => setInterestRate(parseInt(e.target.value))}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Impuesto a la propiedad</span>
              <div className="label-text-alt">
                <span className="px-5 font-bold">{taxRate / 100}%</span>
                <span>
                  {((price * taxRate) / 10000).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </label>
            <input
              name="taxRate"
              type="range"
              min={0}
              max={200}
              step={1}
              value={taxRate}
              className="range range-secondary range-sm"
              onChange={(e) => setTaxRate(parseInt(e.target.value))}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Seguro de la propiedad</span>
              <div className="label-text-alt">
                <span className="px-5 font-bold">{insuranceRate / 100}%</span>
                <span>
                  {((price * insuranceRate) / 10000).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </label>
            <input
              name="insuranceRate"
              type="range"
              min={0}
              max={200}
              step={1}
              value={insuranceRate}
              className="range range-secondary range-sm"
              onChange={(e) => setInsuranceRate(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-evenly gap-4">
          <div className="stats max-w-fit bg-primary-content shadow">
            <div className="stat text-center">
              <div className="stat-title">Pago mensual estimado</div>
              <div className="stat-value text-secondary">
                {(payment + pmi + taxes + insurance + fees).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-2 font-bold">Detalles del pago</h3>
            <div>
              <table className="table-xs table">
                <tbody>
                  <tr>
                    <th>Cuota</th>
                    <td className="text-end">
                      {payment.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th>PMI ({pmiRate / 100}%)</th>
                    <td className="text-end">
                      {pmi.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th>Impuestos</th>
                    <td className="text-end">
                      {taxes.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th>Seguros</th>
                    <td className="text-end">
                      {insurance.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th>Cargos adicionales</th>
                    <td className="text-end">
                      {fees.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="max-w-md bg-primary-content shadow py-2 px-6 rounded-2xl">
          <div className="text-center">
            <span>Estimado de ingresos anuales del grupo familiar requeridos para la aprobación de un prestamo: </span>
            <strong className="text-secondary">
              {(Math.floor(((payment + fees) * 3 * 12) / 1000) * 1000).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })}
            </strong>
          </div>
        </div>
      </div>
    </>
  );
}
