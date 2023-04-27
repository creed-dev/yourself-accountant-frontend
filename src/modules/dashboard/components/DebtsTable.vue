<template>
  <q-table
    class="mb-5"
    :rows="props.debts"
    :columns="columns"
    :rows-per-page-options="[0]"
    row-key="name"
    hide-bottom
    bordered
  >
    <template v-slot:body="debts">
      <q-tr :props="debts">
        <q-td key="name" :props="debts">
          {{ debts.row.name }}
        </q-td>
        <q-td key="amount" :props="debts">
          <template v-if="!existInSelectedRows(debts.row.id)">
            {{ debts.row.amount }}
          </template>

          <q-input
            v-if="existInSelectedRows(debts.row.id)"
            outlined
            type="number"
            v-model="debts.row.amount"
            label="Сумма"
            lazy-rules
            :rules="[(val) => (val && val > 0) || 'Сумма обязательна']"
            @update:modelValue="debts.row.amount = Number(debts.row.amount)"
          />
        </q-td>
        <q-td key="date" :props="debts">
          <template v-if="!existInSelectedRows(debts.row.id)">
            {{ debts.row.date }}
          </template>

          <q-input
            v-if="existInSelectedRows(debts.row.id)"
            outlined
            v-model="debts.row.date"
            mask="date"
            :rules="[(val) => (val && val.length > 0) || 'Дата обязательна']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="debts.row.date" minimal>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-td>
        <q-td key="actions" :props="debts">
          <template v-if="!existInSelectedRows(debts.row.id)">
            <q-btn
              class="mr-2"
              round
              size="sm"
              color="primary"
              icon="edit"
              @click="onEditClick(debts.row)"
            />
            <q-btn
              round
              size="sm"
              color="deep-orange"
              icon="delete"
              @click="openConfirmDeleteDialog(debts.row)"
            />
          </template>
          <template v-if="existInSelectedRows(debts.row.id)">
            <q-btn
              class="mr-2"
              round
              size="sm"
              color="secondary"
              icon="done"
              @click="onDoneClick(debts.row)"
            />
            <q-btn
              @click="onCancelClick(debts.row)"
              round
              size="sm"
              color="deep-orange"
              icon="close"
            />
          </template>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <q-dialog v-model="confirmDeleteDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Вы уверены что хотите удалить запись?</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Да"
          color="secondary"
          v-close-popup
          @click="onConfirmDeleteClick()"
        />
        <q-btn
          label="Нет"
          color="deep-orange"
          v-close-popup
          @click="onCancelDeleteClick()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { Debt } from '@/interfaces/debt';
import { ref } from 'vue';
import Errors from '@/modules/app/helpers/errors';
import DebtsApi from '@/api/debts.api';
import { useDebtsStore } from '@/stores/debts';
import type { ChangedValuesForDebtUpdate } from '@/modules/dashboard/interfaces/changed-values-for-debt-update.interface';

interface Props {
  debts: Debt[];
}

const props: Props = defineProps<Props>();
const debtsStore = useDebtsStore();

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Имя',
    align: 'left',
  },
  {
    name: 'amount',
    align: 'center',
    label: 'Сумма',
    field: 'amount',
  },
  { name: 'date', label: 'Дата', field: 'date', align: 'center' },
  { name: 'actions', label: 'Действия' },
];

const selectedRows = ref<Debt[]>([]);
const confirmDeleteDialog = ref<boolean>(false);
const confirmDeleteDialogObject = ref<Debt | null>(null);

function existInSelectedRows(rowId: number) {
  return selectedRows.value.find((item) => item.id === rowId);
}

function onEditClick(row: Debt) {
  selectedRows.value.push(row);
}

function openConfirmDeleteDialog(row: Debt) {
  confirmDeleteDialog.value = true;
  confirmDeleteDialogObject.value = row;
}

async function onConfirmDeleteClick() {
  try {
    await DebtsApi.deleteDebt(confirmDeleteDialogObject.value!.id!);
    debtsStore.deleteDebt(confirmDeleteDialogObject.value!);
  } catch (error: any) {
    Errors.notifyBackendError(error);
  }
}

function onCancelDeleteClick() {
  confirmDeleteDialogObject.value = null;
}

async function onDoneClick(row: Debt) {
  try {
    const changedValues: ChangedValuesForDebtUpdate = {
      amount: Number(row.amount),
      date: row.date.split('/').join('-'),
    };

    const updatedDebt = await DebtsApi.updateDebt(row.id!, changedValues);
    debtsStore.updateDebt(updatedDebt.data);

    selectedRows.value = selectedRows.value.filter(
      (item) => item.id !== row.id
    );
  } catch (error: any) {
    Errors.notifyBackendError(error);
  }
}

function onCancelClick(row: Debt) {
  selectedRows.value = selectedRows.value.filter((item) => item.id !== row.id);
}
</script>
