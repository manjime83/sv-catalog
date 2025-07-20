"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProjectEstimate({
  price: p,
  fees: f,
  taxRate: t,
  insuranceRate: i,
  mortgageRate,
}: {
  price: number;
  fees: number;
  taxRate: number;
  insuranceRate: number;
  mortgageRate: number;
}) {
  const searchParams = useSearchParams();

  const dp = Math.min(+(searchParams.get("dp") ?? "3.5"), 80);
  const ir = Math.min(+(searchParams.get("ir") ?? mortgageRate), 10);

  const [price, setPrice] = useState(p);
  const [downPayment, setDownPayment] = useState(dp * 100);
  const [interestRate, setInterestRate] = useState(ir * 100);
  const [taxRate, setTaxRate] = useState(t * 100);
  const [insuranceRate, setInsuranceRate] = useState(i * 100);

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
      <div className="flex flex-col w-full gap-4 md:flex-row">
        <div className="flex-1">
          <div className="w-full form-control">
            <label className="label">
              <span className="label-text">Precio de la propiedad</span>
              <span className="font-bold label-text-alt">
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
              min={100000}
              max={1000000}
              step={1000}
              value={price}
              className="range range-secondary range-sm"
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </div>
          <div className="w-full form-control">
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
              max={8000}
              step={50}
              value={downPayment}
              className="range range-secondary range-sm"
              onChange={(e) => setDownPayment(parseInt(e.target.value))}
            />
          </div>
          <div className="w-full form-control">
            <label className="label">
              <span className="label-text">Tasa de interes</span>
              <span className="font-bold label-text-alt">{interestRate / 100}%</span>
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
          <div className="w-full form-control">
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
          <div className="w-full form-control">
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
        <div className="flex flex-col items-center gap-4 justify-evenly">
          <div className="shadow stats max-w-fit bg-secondary-content">
            <div className="text-center stat">
              <div className="stat-title">Pago mensual estimado</div>
              <div className="stat-value text-secondary">
                {(payment + pmi + insurance + taxes + fees).toLocaleString("en-US", {
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
              <table className="table table-xs">
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
                    <th>PMI {pmi > 0 ? `(${pmiRate / 100}%)` : ""}</th>
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
      {downPayment < 2000 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="max-w-md px-6 py-2 shadow bg-secondary-content rounded-2xl">
            <div className="text-center">
              <span>
                Estimado de ingresos anuales del grupo familiar requeridos para la aprobación de un prestamo:{" "}
              </span>
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
      )}
    </>
  );
}
