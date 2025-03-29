# Acrescentando algumas regras de negócio
Em nossa aplicação, é importante garantir que o ciclo de vida do lead seja devidamente respeitado, portanto iremos implementar as seguintes regras:

- Os leads devem ser criados com o status “New”, a menos que o status seja explicitamente informado.
- Um lead com status “New” deve ser contatado, tendo seu status mudado para “Contacted”, antes de poder receber qualquer outro status.
- Para ser arquivado, ou seja, ter o status mudado para “Archived”, o lead deve ter recebido a última atualização a, no mínimo, 6 meses.