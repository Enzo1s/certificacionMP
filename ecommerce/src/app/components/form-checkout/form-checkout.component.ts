import { Component, OnInit } from '@angular/core';
declare var MercadoPago;

@Component({
  selector: 'app-form-checkout',
  templateUrl: './form-checkout.component.html',
  styleUrls: ['./form-checkout.component.css'],
})
export class FormCheckoutComponent implements OnInit {
  //your public key
  mp = new MercadoPago('APP_USR-7eb0138a-189f-4bec-87d1-c0504ead5626');
  cardForm: any;

  constructor() {
    this.cardForm = this.mp.cardForm({
      amount: '100.5',
      autoMount: true,
      form: {
        id: 'form-checkout',
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: 'Titular de la tarjeta',
        },
        cardholderEmail: {
          id: 'form-checkout__cardholderEmail',
          placeholder: 'E-mail',
        },
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: 'Número de la tarjeta',
        },
        cardExpirationMonth: {
          id: 'form-checkout__cardExpirationMonth',
          placeholder: 'Mes de vencimiento',
        },
        cardExpirationYear: {
          id: 'form-checkout__cardExpirationYear',
          placeholder: 'Año de vencimiento',
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'Código de seguridad',
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Cuotas',
        },
        identificationType: {
          id: 'form-checkout__identificationType',
          placeholder: 'Tipo de documento',
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Número de documento',
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Banco emisor',
        },
      },
      callbacks: {
        onFormMounted: (error) => {
          if (error)
            return console.warn('Form Mounted handling error: ', error);
          console.log('Form mounted');
        },
        onSubmit: (event) => {
          event.preventDefault();

          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = this.cardForm.getCardFormData();

          fetch('http://localhost:9000/api/v1/producto/process_payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: 'Descripción del producto',
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            }),
          });
        },
        onFetching: (resource) => {
          console.log('Fetching resource: ', resource);

          // Animate progress bar
          const progressBar = document.querySelector('.progress-bar');
          progressBar.removeAttribute('value');

          return () => {
            progressBar.setAttribute('value', '0');
          };
        },
      },
    });
  }

  ngOnInit(): void {}
}
