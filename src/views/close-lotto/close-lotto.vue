<template>
  <b-card title="รายการเลขปิดรับ">
    <div class="custom-search">
      <!-- advance search input -->
      <b-row class="align-items-end">
        <!-- <b-col md="2">
          <b-form-group>
            <label>ผลหวย:</label>
            <b-form-input
              v-model="filter.name"
              type="text"
              class="d-inline-block"
              maxlength="3"
              @input="getData()"
            />
          </b-form-group>
        </b-col> -->
        <b-col md="3">
          <b-form-group>
            <label for="password">ประเภทหวย</label>
            <v-select
              v-model="filter.typeHuay"
              :options="optionsTypeHuay"
              label="lotto_type_name"
              placeholder="ประเภทหวย"
              :clearable="true"
              @input="getData()"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group>
            <label for="password">เลขปิดรับ</label>
            <b-form-input
              id="price"
              type="text"
              placeholder="เลขปิดรับ"
              pattern="[0-9]*"
              v-model="form.closeNumber"
              maxlength="10"
              :disabled="filter.typeHuay == null"
              @input="getData()"
            />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="button"
              variant="success"
              class="float-left"
              @click="handleSearch"
            >
              <feather-icon icon="SearchIcon" class="mr-50" />
              <span class="align-middle">ค้นหา</span>
            </b-button>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="button"
              variant="primary"
              class="float-right"
              exact
              @click="showModalAddPrize()"
            >
              <feather-icon icon="PlusIcon" class="mr-50" />
              <span class="align-middle">เพิ่มเลขปิดรับ</span>
            </b-button>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="button"
              variant="danger"
              class="float-right mr-2"
              exact
              @click="showModalDeletePrize()"
            >
              <feather-icon icon="TrashIcon" class="mr-50" />
              <span class="align-middle">ลบเลขปิดรับ</span>
            </b-button>
          </b-form-group>
        </b-col>
      </b-row>
    </div>

    <!-- <b-overlay
      :show="OverlayFlag"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
    > -->
    <div style="overflow-x: auto; padding: 0" v-if="rows ? rows.length : 0">
      <hr />
      <div v-for="(item, index) in getDataLottoType" :key="index">
        <div v-if="item.result ? item.result.length : 0">
          <h4 class="m-1">
            <b>{{ item.program }}</b>
          </h4>
          <table class="table">
            <thead>
              <tr class="text-center">
                <th>ลำดับ</th>
                <th>เลขปิดรับ</th>
                <th>ราคาจ่าย</th>
                <th>จำนวนที่ซื้อได้</th>
                <!-- <th>หมายเหตุ</th>
                <th>ยอดแทง</th>
                <th>ส่วนลด</th>
                <th>รวม</th>
                <th>ยอดถูกรางวัล</th>
                <th>สถานะโพย</th>
                <th>สถานะ</th>
                <th>โพย</th>
                <th>ยกเลิกโพย</th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in item.result"
                :key="index"
                class="text-center"
                :class="{
                  'bg-danger text-white':
                    data.buy_limit < 1 && data.buy_limit != null,
                }"
                @click="showModalEditCloseNumber(data)"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ data.number }}</td>
                <td>{{ data.pay }}</td>
                <td>{{ numberWithCommas(data.buy_limit) }}</td>
                <!-- <td style="padding: 0">{{ formatDate(data.created_at) }}</td>
                  <td style="padding: 0">{{ data.poy_code }}</td>
                  <td style="padding: 0">
                    {{ data.name }} {{ data.familyName }}
                  </td>
                  <td style="padding: 0">{{ data.note }}</td>
                  <td style="padding: 0">
                    {{ numberWithCommas(data.sum_total) }}
                  </td>
                  <td style="padding: 0">
                    {{ numberWithCommas(data.sum_discount) }}
                  </td>
                  <td style="padding: 0">
                    {{ numberWithCommas(data.sum_total - data.sum_discount) }}
                  </td>
                  <td style="padding: 0">
                    {{ numberWithCommas(data.sum_prize) }}
                  </td> -->

                <!-- <td>
                    <span
                      class="badge bg-success"
                      v-if="data.status_poy == 'SUC'"
                      >สำเร็จ</span
                    >
                    <span class="badge bg-danger" v-else>ยกเลิกโพย</span>
                  </td>
                  <td>
                    <span
                      class="text-white"
                      v-if="data.sum_prize && data.status_result"
                      >ถูกรางวัล</span
                    >
                    <span
                      class="text-warning"
                      v-else-if="data.status_result == 0"
                      >รอผล</span
                    >
                    <span
                      class="text-danger"
                      v-else-if="
                        data.sum_prize == null && data.status_result == 1
                      "
                      >ไม่ถูกรางวัล</span
                    >
                  </td> -->
                <!-- <td style="padding: 0">
                    <button
                      class="btn-sm btn-primary"
                      @click="showModalBill(data.poy_code)"
                    >
                      ดูโพย
                    </button>
                  </td>
                  <td style="padding: 0">
                    <button
                      class="btn-sm btn-danger"
                      @click="onSubmitCancel(data)"
                    >
                      ยกเลิกโพย
                    </button>
                  </td> -->
              </tr>
            </tbody>
            <!-- <tfoot>
                <tr class="text-center">
                  <td>รวม</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style="padding: 0"></td>
                  <td style="padding: 0" class="text-success">
                    {{ resultTotal(item.program) }}
                  </td>
                  <td style="padding: 0" class="text-danger">
                    {{ resultDiscount(item.program) }}
                  </td>
                  <td style="padding: 0" class="text-success">
                    {{ resultTotalPrice(item.program) }}
                  </td>
                  <td style="padding: 0" class="text-success">
                    {{ resultPrize(item.program) }}
                  </td>

                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tfoot> -->
          </table>
        </div>
      </div>
    </div>
    <div class="text-center mt-3 mb-3" v-else>ไม่พบข้อมูล</div>
    <!-- </b-overlay> -->

    <!-- :select-options="{
            enabled: true,
            trigger: 'enter',
            selectOnCheckboxOnly: true,
            selectionInfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectInfo: true,
            selectAllByGroup: true,
          }" -->
    <!-- table -->
    <!-- <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="rows"
      :total-rows="totalRecords"
      :rtl="direction"
      :is-loading.sync="isLoading"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm,
      }"
      :pagination-options="{
        enabled: true,
      }"
      @on-sort-change="onSortChange"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field === 'num'">
          <span>{{ props.row.originalIndex + 1 }}</span>
        </span>
        <span v-if="props.column.field === 'date_close'">
          <span>{{ formatDateDay(props.row.date_lotto) }}</span>
        </span>
        <span v-if="props.column.field === 'action'">
          <span>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item
                :to="{
                  name: 'addlottery',
                  params: { id: props.row.id },
                }"
              >
                <feather-icon icon="Edit2Icon" class="mr-50" />
                <span>Edit</span>
              </b-dropdown-item>
              <b-dropdown-item
                :to="{
                  name: 'addlottery',
                  params: { id: props.row.id },
                }"
              >
                <feather-icon icon="TrashIcon" class="mr-50" />
                <span>Delete</span>
              </b-dropdown-item>
            </b-dropdown>
          </span>
        </span>

        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      

      <template slot="loadingContent"> Loading </template>
    </vue-good-table> -->
    <!-- pagination -->
    <!-- <template slot="pagination-bottom" slot-scope="props">
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-center mb-0 mt-1">
          <span class="text-nowrap"> รายการที่แสดง </span>
          <b-form-select
            v-model="pageLength"
            :options="pages"
            class="mx-1"
            @input="handlePageChange"
          />
          <span class="text-nowrap"> ทั้งหมด {{ props.total }} รายการ </span>
        </div>
        <div>
          <b-pagination
            :value="1"
            :total-rows="props.total"
            :per-page="pageLength"
            first-number
            last-number
            align="right"
            prev-class="prev-item"
            next-class="next-item"
            class="mt-1 mb-0"
            @change="handleChangePage"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </div>
      </div>
    </template> -->
    <validation-observer ref="addCredit">
      <b-modal
        id="modal-credit"
        ref="modalAddPrize"
        cancel-variant="outline-secondary"
        centered
        hide-footer
        no-close-on-backdrop
        title="เพิ่มเลขปิดรับ"
      >
        <b-form>
          <b-row>
            <b-col md="6">
              <b-form-group>
                <label for="email">ประเภทหวย:</label>
                <v-select
                  v-model="form.typeHuay"
                  :options="optionsTypeHuay"
                  label="lotto_type_name"
                  placeholder="ประเภทหวย"
                  :clearable="true"
                />
                <!-- <validation-provider
                  #default="{ errors }"
                  name="ผลหวย"
                  rules="required|integer|"
                >
                  <b-form-input
                    id="credit"
                    type="text"
                    placeholder="xxx"
                    v-model="form.prize3top"
                    maxlength="3"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider> -->
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ประเภทเลข:</label>
                <v-select
                  v-model="form.typeNumber"
                  :options="optionsType"
                  label="lotto_type_name"
                  placeholder="ประเภทเลข"
                  :clearable="true"
                />
                <!-- <validation-provider
                  #default="{ errors }"
                  name="ผลหวย"
                  rules="required|integer|"
                >
                  <b-form-input
                    id="credit"
                    type="text"
                    placeholder="3 ตัวบน"
                    disabled
                    v-model="form.type3top"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider> -->
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย (ขั้นที่ 1) บาท:</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="ราคาจ่าย"
                  pattern="[0-9]*"
                  v-model="form.pay"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">จำนวนที่ซื้อได้ (ขั้นที่ 1) บาท:</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.buy_limit"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย (ขั้นที่ 2) บาท:</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="ราคาจ่าย"
                  pattern="[0-9]*"
                  v-model="form.pay2"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">จำนวนที่ซื้อได้ (ขั้นที่ 2) บาท:</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.buy_limit2"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ราคาจ่าย (ขั้นที่ 3) บาท:</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="ราคาจ่าย"
                  pattern="[0-9]*"
                  v-model="form.pay3"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">จำนวนที่ซื้อได้ (ขั้นที่ 3) บาท:</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="form.buy_limit3"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <div>
                <b-form-checkbox
                  v-model="allNumber"
                  value="1"
                  unchecked-value="0"
                  name="check-button"
                  inline
                >
                  ปิดรับทั้งหมด
                </b-form-checkbox>
              </div>
            </b-col>
            <b-col md="6">
              <div>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="button"
                  variant="primary"
                  class="mr-1"
                  exact
                  @click="space6back()"
                >
                  <!-- <feather-icon icon="PlusIcon" class="mr-50" /> -->
                  <span class="align-middle">กลับเลข</span>
                </b-button>
              </div>
            </b-col>
            <b-col md="12">
              <b-form-group>
                <label for="password">เลขปิดรับ</label>
                <!-- <v-select
                    v-model="form.typeHuay"
                    :options="optionsTypeHuay"
                    label="lotto_type_name"
                    placeholder="ประเภทหวย"
                    :clearable="true"
                  /> -->
                <b-form-textarea
                  id="internal-payment-note"
                  v-model="form.number"
                  placeholder="เลขปิดรับ (ถ้ามีเลขหลายตัวสามารถเว้นวรรคได้) เช่น 00 11 22 33"
                  rows="5"
                  trim
                  :disabled="allNumber === '1'"
                />
              </b-form-group>
            </b-col>
            <!-- <b-col md="6">
                <b-form-group>
                  <label for="password">ประเภทเลข</label>
                  <v-select
                    v-model="form.type"
                    :options="optionsType"
                    placeholder="ประเภท"
                    :clearable="false"
                  />
                </b-form-group>
              </b-col> -->
            <b-col md="12">
              <b-form-group>
                <div class="text-center">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="button"
                    variant="success"
                    class="mr-1"
                    exact
                    @click="validationForm()"
                  >
                    <feather-icon icon="PlusIcon" class="mr-50" />
                    <span class="align-middle">เพิ่มเลขปิดรับ</span>
                  </b-button>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
    </validation-observer>
    <validation-observer ref="editForm">
      <b-modal
        id="modal-credit"
        ref="modalEditCloseNumber"
        cancel-variant="outline-secondary"
        centered
        hide-footer
        no-close-on-backdrop
        title="แก้ไขเลขปิดรับ"
      >
        <b-form>
          <b-row>
            <!-- <b-col md="6">
            <b-form-group>
              <label for="email">ประเภทหวย:</label>
              <v-select
                v-model="formedit.typeHuay"
                :options="optionsTypeHuay"
                label="lotto_type_name"
                placeholder="ประเภทหวย"
                :clearable="true"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label for="email">ประเภทเลข:</label>
              <v-select
                v-model="formedit.typeNumber"
                :options="optionsType"
                label="lotto_type_name"
                placeholder="ประเภทเลข"
                :clearable="true"
              />
            </b-form-group>
          </b-col> -->
            <b-col md="4">
              <b-form-group>
                <label for="email">เลขปิดรับ:</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="ราคาจ่าย"
                  pattern="[0-9]*"
                  v-model="formedit.number"
                  maxlength="10"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group>
                <label for="email">ราคาจ่าย (ขั้นที่ 1):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="ราคาจ่าย"
                  pattern="[0-9]*"
                  v-model="formedit.pay"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group>
                <label for="email">จำนวนที่ซื้อได้ (ขั้นที่ 1):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="formedit.buy_limit"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="4"> </b-col>
            <b-col md="4">
              <b-form-group>
                <label for="email">ราคาจ่าย (ขั้นที่ 2):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="ราคาจ่าย"
                  pattern="[0-9]*"
                  v-model="formedit.pay2"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group>
                <label for="email">จำนวนที่ซื้อได้ (ขั้นที่ 2):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="formedit.buy_limit2"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="4"> </b-col>
            <b-col md="4">
              <b-form-group>
                <label for="email">ราคาจ่าย (ขั้นที่ 3):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="ราคาจ่าย"
                  pattern="[0-9]*"
                  v-model="formedit.pay3"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group>
                <label for="email">จำนวนที่ซื้อได้ (ขั้นที่ 3):</label>
                <b-form-input
                  id="price"
                  type="text"
                  placeholder="จำนวนที่ซื้อได้"
                  pattern="[0-9]*"
                  v-model="formedit.buy_limit3"
                  maxlength="10"
                />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group>
                <div class="text-center">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="button"
                    variant="success"
                    class="mr-1"
                    exact
                    @click="validationEditForm()"
                  >
                    <feather-icon icon="PlusIcon" class="mr-50" />
                    <span class="align-middle">แก้ไขเลขปิดรับ</span>
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="button"
                    variant="danger"
                    exact
                    @click="validationDeleteForm()"
                  >
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span class="align-middle">ลบ</span>
                  </b-button>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
    </validation-observer>
    <validation-observer ref="deleteCredit">
      <b-modal
        id="modal-credit"
        ref="modalDeletePrize"
        cancel-variant="outline-secondary"
        centered
        hide-footer
        no-close-on-backdrop
        title="ลบเลขปิดรับ"
      >
        <b-form>
          <b-row>
            <b-col md="6">
              <b-form-group>
                <label for="email">ประเภทหวย:</label>
                <v-select
                  v-model="form.typeHuay"
                  :options="optionsTypeHuay"
                  label="lotto_type_name"
                  placeholder="ประเภทหวย"
                  :clearable="true"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="email">ประเภทเลข:</label>
                <v-select
                  v-model="form.typeNumber"
                  :options="optionsType"
                  label="lotto_type_name"
                  placeholder="ประเภทเลข"
                  :clearable="true"
                />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group>
                <div class="text-center">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="button"
                    variant="danger"
                    class="mr-1"
                    exact
                    @click="validationDeleteForm()"
                  >
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span class="align-middle">ลบเลขปิดรับ</span>
                  </b-button>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
    </validation-observer>
    <!-- <validation-observer ref="disCredit">
        <b-modal
          id="modal-discredit"
          ref="modalDiscredit"
          cancel-variant="outline-secondary"
          ok-title="Login"
          cancel-title="Close"
          centered
          hide-footer
          title="ลบเครดิต"
        >
          <b-form>
            <b-form-group>
              <label for="email">เครดิต:</label>
              <b-form-input
                id="credit"
                type="text"
                placeholder="เครดิต"
                v-model="form.credit"
              />
            </b-form-group>
            <b-form-group>
              <label for="password">ประเภท</label>
              <v-select
                v-model="form.type"
                :options="optionsDisCredit"
                placeholder="ประเภท"
                :clearable="false"
              />
            </b-form-group>
            <b-form-group>
              <b-form-textarea
                id="internal-payment-note"
                v-model="form.note"
                placeholder="เหตุผล"
                rows="5"
                trim
              />
            </b-form-group>
            <b-form-group>
              <div class="text-center">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="button"
                  variant="danger"
                  class="mr-1"
                  exact
                  @click="validationFormDisCredit()"
                >
                  <feather-icon icon="MinusIcon" class="mr-50" />
                  <span class="align-middle">ลบเครดิต</span>
                </b-button>
              </div>
            </b-form-group>
          </b-form>
        </b-modal>
      </validation-observer> -->
  </b-card>
</template>

<script>
import {
  BPagination,
  BFormGroup,
  BFormSelect,
  BDropdownItem,
  BDropdown,
  BRow,
  BCol,
  BButton,
  BCard,
  BFormInput,
  BModal,
  BFormTextarea,
  BForm,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import Ripple from "vue-ripple-directive";
import store from "@/store/index";
import { HTTP } from "@/services/http-common";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { BFormCheckbox } from "bootstrap-vue";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, integer } from "@validations";
import moment from "moment";

export default {
  components: {
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdownItem,
    BDropdown,
    BCol,
    BRow,
    BButton,
    BCard,
    BFormCheckbox,
    BModal,
    BFormTextarea,
    BForm,
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      modelId: this.$route.params.modelId,
      log: [],
      isLoading: false,
      currentPage: 1,
      pageLength: 10,
      totalRecords: 0,
      sort: [
        {
          field: "",
          sort: "",
        },
      ],
      dir: false,
      pages: ["5", "10", "25"],
      columns: [
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ลำดับ",
          field: "num",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "หวย",
          field: "lotto_type_name",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "เลขปิดรับ",
          field: "number",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "ประเภทเลข",
          field: "type",
        },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "วันที่ปิดรับ",
          field: "date_close",
        },
        // {
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   label: "ออกผล",
        //   field: "status_prize",
        // },
        // {
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   label: "เครดิต",
        //   field: "credit",
        //   width: "120px",
        //   sortable: false,
        // },
        {
          thClass: "text-center",
          tdClass: "text-center",
          label: "",
          field: "action",
          sortable: false,
          width: "64px",
        },
      ],
      rows: [],
      searchTerm: "",
      filter: {
        subject: "",
        startDate: "",
        endDate: "",
        typeHuay: null,
      },
      form: {
        prize3top: "",
        prize2bottom: "",
        typeHuay: "",
        typeNumber: "",
        type: "",
        type3top: "3 ตัวบน",
        type2bottom: "2 ตัวล่าง",
        closeNumber: "",
      },
      formedit: {
        pay: "",
        pay2: "",
        pay3: "",
        buy_limit: "",
        buy_limit2: "",
        buy_limit3: "",
        cn_id: "",
        closeNumber: "",
      },
      optionsType: ["3 ตัวบน", "3 ตัวโต๊ด", "2 ตัวบน", "2 ตัวล่าง"],
      optionsTypeHuay: [],
      required,
      integer,
      dataCredit: "",
      dataDisCredit: "",
      max: 3,
      closeNumber: [],
      allNumber: "0",
    };
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true;
        return this.dir;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false;
      return this.dir;
    },
    getDataLottoType: function () {
      const lotto = [];
      // const matches = this.option.map((item) => item.lotto_type_name);
      // let program = [...new Set(matches)];
      for (let i = 0; i < this.optionsType.length; i++) {
        const item = this.optionsType[i];
        const result = this.rows.filter((el) => el.type === item);
        lotto.push({ program: item, result });
      }
      return lotto;
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.fetchTypeHuay();
  },
  methods: {
    numberWithCommas(x) {
      let sum = 0;
      if (x) {
        sum = x;
        return (
          parseFloat(sum)
            // .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
      }
      return x != null ? x : "-";
    },
    getData() {
      this.isLoading = true;
      HTTP.get("api/close-number/all", {
        params: {
          lotto_type_id:
            this.filter.typeHuay != null
              ? this.filter.typeHuay.lotto_type_id
              : undefined,
          number: this.form.closeNumber ? this.form.closeNumber : undefined,
        },
      })
        .then((response) => {
          this.rows = response.data.data;
          this.totalRecords = response.data.data.total;
          // console.log(this.rows)
          this.isLoading = false;
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "แจ้งเตือน",
              text:
                error.response.data.msg !== undefined
                  ? error.response.data.msg
                  : error.status,
              icon: "XCircleIcon",
              variant: "danger",
            },
          });
          this.isLoading = false;
        });
    },
    fetchTypeHuay() {
      HTTP.get("api/lotto-type/all", {})
        .then((response) => {
          this.optionsTypeHuay = response.data.data;
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "แจ้งเตือน",
              text:
                error.response.data.msg !== undefined
                  ? error.response.data.msg
                  : error.status,
              icon: "XCircleIcon",
              variant: "danger",
            },
          });
        });
    },
    updateStatus(id) {
      HTTP.get(`api/get-prize/lotto-results`, { params: { lotto_type_id: id } })
        .then((resp) => {
          this.showToast(resp.data.msg, "success");
          this.updateBalance(id);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 403) {
              this.$store.dispatch("logoutAuth");
              this.$router.push("/login");
            } else {
              this.showToast(
                err.response.data.msg !== undefined
                  ? err.response.data.msg
                  : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
                "danger"
              );
              this.getData();
            }
          }
        });
    },
    updateBalance(id) {
      HTTP.put(`api/get-prize/update-creditbalacne`, {
        lotto_type_id: id,
      })
        .then((resp) => {
          this.showToast(resp.data.msg, "success");
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 403) {
              this.$store.dispatch("logoutAuth");
              this.$router.push("/login");
            } else {
              this.showToast(
                err.response.data.msg !== undefined
                  ? err.response.data.msg
                  : "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่",
                "danger"
              );
              // this.getData();
            }
          }
        });
    },
    validationForm() {
      if (this.form.number != undefined) {
        const numberArray = this.form.number.split(" ");
        if (numberArray.length <= 1) {
          if (this.form.typeNumber == "3 ตัวบน") {
            const arr = numberArray[0].match(/.{1,3}/g);
            this.closeNumber = arr;
          } else if (this.form.typeNumber == "3 ตัวโต๊ด") {
            const arr = numberArray[0].match(/.{1,3}/g);
            this.closeNumber = arr;
          } else if (this.form.typeNumber == "2 ตัวบน") {
            const arr = numberArray[0].match(/.{1,2}/g);
            this.closeNumber = arr;
          } else if (this.form.typeNumber == "2 ตัวล่าง") {
            const arr = numberArray[0].match(/.{1,2}/g);
            this.closeNumber = arr;
          }
        } else {
          this.closeNumber = numberArray;
        }
      }

      this.$refs.addCredit.validate().then((success) => {
        if (success) {
          HTTP.post(`api/close-number/add-close-number`, {
            lotto_type_id:
              this.form.typeHuay != null
                ? this.form.typeHuay.lotto_type_id
                : undefined,
            number: this.closeNumber,
            type: this.form.typeNumber,
            pay: this.form.pay,
            pay2: this.form.pay2,
            pay3: this.form.pay3,
            buy_limit: this.form.buy_limit ? this.form.buy_limit : undefined,
            buy_limit2: this.form.buy_limit2 ? this.form.buy_limit2 : undefined,
            buy_limit3: this.form.buy_limit3 ? this.form.buy_limit3 : undefined,
            allNumber: this.allNumber,
          })
            .then((resp) => {
              this.showToast(
                resp.data.msg != null ? resp.data.msg : "สำเร็จ",
                "success"
              );
              this.$refs.modalAddPrize.hide();
              this.getData();
            })
            .catch((error) => {
              this.showToast(error.response.data.msg, "danger");
            });
        }
      });
    },
    validationDeleteForm() {
      // const numberArray = this.form.number.split(" ");
      this.$refs.deleteCredit.validate().then((success) => {
        if (success) {
          HTTP.delete(`api/close-number/delete-close-number`, {
            data: {
              lotto_type_id:
                this.form.typeHuay != null
                  ? this.form.typeHuay.lotto_type_id
                  : undefined,
              // number: numberArray,
              cn_id: this.formedit.cn_id ? this.formedit.cn_id : undefined,
              type: this.form.typeNumber ? this.form.typeNumber : undefined,
            },
          })
            .then((resp) => {
              this.showToast(
                resp.data.msg != null ? resp.data.msg : "สำเร็จ",
                "success"
              );
              this.$refs.modalEditCloseNumber.hide();
              this.getData();
            })
            .catch((error) => {
              this.showToast(error.response.data.msg, "danger");
            });
        }
      });
    },
    validationEditForm() {
      this.$refs.editForm.validate().then((success) => {
        if (success) {
          HTTP.put(`api/close-number/edit-close-number`, {
            cn_id: this.formedit.cn_id,
            pay: this.formedit.pay,
            pay2: this.formedit.pay2,
            pay3: this.formedit.pay3,
            buy_limit: this.formedit.buy_limit
              ? this.formedit.buy_limit
              : 0,
              buy_limit2: this.formedit.buy_limit2
              ? this.formedit.buy_limit2
              : 0,
              buy_limit3: this.formedit.buy_limit3
              ? this.formedit.buy_limit3
              : 0,
          })
            .then((resp) => {
              this.showToast(
                resp.data.msg != null ? resp.data.msg : "สำเร็จ",
                "success"
              );
              this.$refs.modalEditCloseNumber.hide();
              this.getData();
            })
            .catch((error) => {
              this.showToast(error.response.data.msg, "danger");
            });
        }
      });
    },
    func6back(number) {
      var num = number; //ตัวเลขที่ต้องการหาโต๊ด
      var textnum = num.toString(); //แปลงตัวเลขเป็นตัวอักษร
      var numlv1 = []; //ประกาศตัวแปลให้เป็น Array
      var numlv2 = [];
      var result = [];
      //จัดการ level 1 โดยการสลับตัวเลข 2 หลักซ้ายสุด
      numlv1[0] = textnum.substr(0, 1) + textnum.substr(1, 1);
      numlv1[1] = textnum.substr(1, 1) + textnum.substr(0, 1);
      //จัดการ level 2
      var endnum = textnum.substr(2, 1); //จำเลขตัวสุดท้าย
      for (var i = 0; i <= 2 - 1; i++) {
        //วนลูปการแทรกตัวเลข ทั้ง 2 ตัวเลขจาก level 1
        numlv2[0] = numlv1[i].substr(0, 1); //แยกตัวเลข หลักแรกออกมา จากตัวเลข level 1
        numlv2[1] = numlv1[i].substr(1, 1); //แยกตัวเลข หลักที่ 2 ออกมา จากตัวเลข level 1
        result.push(
          endnum + numlv2[0] + numlv2[1],
          numlv2[0] + endnum + numlv2[1],
          numlv2[0] + numlv2[1] + endnum
        );
      }
      let dup = [...new Set(result)];
      return dup;
    },
    space6back() {
      if (this.form.number != undefined) {
        const arr = this.form.number.split(" ");
        const arrLotto = [];
        this.form.number = "";
        arr.forEach((item) => {
          let result = this.func6back(item);

          result.forEach((el) => {
            this.form.number += el + " ";
            arrLotto.push(el);
          });
          console.log(this.form.number);
        });
        // this.form.number = arrLotto;
        this.closeNumber = arrLotto;
        // console.log(arr);
      }

      // const arr = [];
      // this.lottoNumberAll.forEach((item) => {
      //   let result = this.func6back(item.number);
      //   result.forEach((el) => {
      //     arr.push({
      //       number: el,
      //       top: 0,
      //       bottom: 0,
      //       selected: "3 ตัว",
      //     });
      //   });
      // });
      // this.lottoNumberAll = arr;
      // if (data.number.length == 1) {
      //   setTimeout(function () {
      //     data.number = "";
      //   }, 100);
      // }
    },
    // validationFormDisCredit() {
    //   this.$refs.addCredit.validate().then((success) => {
    //     if (success) {
    //       HTTP.put(
    //         `api/admin/member/dis-credit`,
    //         {
    //           id: this.dataCredit.id,
    //           amount: this.form.credit,
    //           type: this.form.type,
    //           note: this.form.note,
    //         },
    //         {
    //           headers: {
    //             Authorization: "Bearer " + localStorage.getItem("bb_token"),
    //           },
    //         }
    //       )
    //         .then((resp) => {
    //           this.showToast(
    //             resp.data.msg != null ? resp.data.msg : "สำเร็จ",
    //             "success"
    //           );
    //           this.$refs.modalDiscredit.hide();
    //         })
    //         .catch((error) => {
    //           this.showToast(error.response.data.msg, "danger");
    //         });
    //     }
    //   });
    // },
    // delVehicleModel() {
    //   this.isLoading = true;
    //   const bodyFormData = new FormData();
    //   bodyFormData.append("modelId", this.$route.params.id);
    //   useNetw
    //     .post("/api/vehicleModel/delete", bodyFormData, {})
    //     .then(() => {
    //       this.$toast({
    //         component: ToastificationContent,
    //         position: "top-right",
    //         props: {
    //           title: "ลบข้อมูลเรียบร้อยแล้ว",
    //           icon: "SaveIcon",
    //           variant: "success",
    //         },
    //       });
    //       this.getData();
    //       this.isLoading = false;
    //     })
    //     .catch((error) => {
    //       this.isLoading = false;
    //       this.$toast({
    //         component: ToastificationContent,
    //         position: "top-right",
    //         props: {
    //           title: "แจ้งเตือน",
    //           text:
    //             error.response.data.message !== undefined
    //               ? error.response.data.message
    //               : error.status,
    //           icon: "XCircleIcon",
    //           variant: "danger",
    //         },
    //       });
    //     });
    // },
    handleSearch() {
      this.getData();
    },
    handleChangePage(page) {
      this.currentPage = page;
      this.getData();
    },
    handlePageChange(active) {
      this.perPage = active;
      this.getData();
    },
    onSortChange(params) {
      this.sort[0].field = params[0].field;
      this.sort[0].sort = params[0].type;
      this.getData();
    },
    showModalAddPrize() {
      this.form.credit = 0;
      this.form.note = "";
      this.form.type = "";
      //   this.dataCredit = data;
      this.$refs.modalAddPrize.show();
    },
    showModalEditCloseNumber(data) {
      this.formedit = data;
      this.form.typeHuay = "";
      //   this.dataCredit = data;
      this.$refs.modalEditCloseNumber.show();
    },
    showModalDeletePrize() {
      // this.form.credit = 0;
      // this.form.note = "";
      // this.form.type = "";
      //   this.dataCredit = data;
      this.$refs.modalDeletePrize.show();
    },
    // showModalDisCredit(data) {
    //   this.form.credit = 0;
    //   this.form.note = "";
    //   this.form.type = "";
    //   this.dataDisCredit = data;
    //   this.$refs.modalDiscredit.show();
    // },
    showToast(text, variant) {
      this.$toast({
        component: ToastificationContent,
        position: "top-right",
        props: {
          title: "แจ้งเตือน...",
          text: text,
          icon: variant === "success" ? "CheckIcon" : "BellIcon",
          variant: variant,
        },
      });
    },
    formatDateDay(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY HH:mm:ss");
    },
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
