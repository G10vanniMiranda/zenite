import { test } from 'node:test';
import assert from 'node:assert/strict';
import { simular, reais, prazo } from './simulacao.js';

test('a casa do topo bate com os números do fechamento', () => {
  const r = simular(780);
  assert.equal(r.paineis, 10);
  assert.equal(r.kwp, 5.5);
  assert.equal(reais(r.novaConta), 'R$ 86');
  assert.equal(prazo(r.meses), '2 anos e 9 meses');
});

test('conta pequena: mínimo de painéis e piso da conta', () => {
  const r = simular(200);
  assert.equal(r.paineis, 4);
  assert.equal(r.novaConta, 60);
  assert.ok(r.economia > 0);
});

test('conta maior pede mais painéis', () => {
  assert.ok(simular(1500).paineis > simular(780).paineis);
});

test('prazo por extenso', () => {
  assert.equal(prazo(12), '1 ano');
  assert.equal(prazo(1), '1 mês');
  assert.equal(prazo(25), '2 anos e 1 mês');
});
