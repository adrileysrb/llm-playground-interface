import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor } from '@angular/common';

interface Mensagem {
  texto: string;
  origem: 'usuario' | 'assistente';
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgClass, NgFor],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ll-playground');

  mensagens: Mensagem[] = [];
  inputTexto = '';

  enviar() {
    const texto = this.inputTexto.trim();
    if (!texto) return;

    this.mensagens.push({ texto, origem: 'usuario' });
    this.inputTexto = '';

    // resposta simulada — substituir pela chamada à API
    setTimeout(() => {
      this.mensagens.push({ texto: 'Resposta do assistente...', origem: 'assistente' });
    }, 500);
  }
}
