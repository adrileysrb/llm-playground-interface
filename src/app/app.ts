import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

interface Mensagem {
  texto: string;
  origem: 'usuario' | 'assistente';
  raciocinio?: string;
  mostrarRaciocinio?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgClass, NgFor, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnDestroy {

  mensagens: Mensagem[] = [];
  inputTexto = '';
  carregando = false;
  demorandoMais = false;

  private timeoutDemora: ReturnType<typeof setTimeout> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ajustarAltura(el: HTMLTextAreaElement) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  enviar(el?: HTMLTextAreaElement) {
    const texto = this.inputTexto.trim();
    if (!texto || this.carregando) return;

    this.mensagens = [...this.mensagens, { texto, origem: 'usuario' }];
    this.inputTexto = '';
    if (el) { el.style.height = 'auto'; }
    this.iniciarCarregamento();

    // resposta simulada — substituir pela chamada à API
    setTimeout(() => {
      this.mensagens = [...this.mensagens, {
        texto: 'Resposta do assistente...',
        origem: 'assistente',
        raciocinio: 'Primeiro analisei o contexto da pergunta, depois considerei as possíveis abordagens e escolhi a mais direta.',
        mostrarRaciocinio: false
      }];
      this.pararCarregamento();
    }, 5000);
  }

  private iniciarCarregamento() {
    this.carregando = true;
    this.demorandoMais = false;
    this.timeoutDemora = setTimeout(() => {
      this.demorandoMais = true;
      this.cdr.detectChanges();
    }, 3000);
  }

  private pararCarregamento() {
    this.carregando = false;
    this.demorandoMais = false;
    if (this.timeoutDemora) {
      clearTimeout(this.timeoutDemora);
      this.timeoutDemora = null;
    }
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.pararCarregamento();
  }
}
