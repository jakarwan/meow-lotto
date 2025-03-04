<template>
  <section id="dashboard-ecommerce">
    <b-row>
      <b-col class="mb-1" xl="12">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
          @click="$router.go(-1)"
        >
          <feather-icon icon="ChevronLeftIcon" />
          กลับ
        </b-button>
      </b-col>
      <b-col xl="12" lg="12" md="12">
        <b-overlay
          :show="OverlayFlagSave"
          spinner-variant="primary"
          spinner-type="grow"
          spinner-small
          rounded="sm"
        >
          <b-card-code title="แทงหวย">
            <div class="row">
              <div class="col-12 col-md-6" v-if="!checkBillsubmit">
                <b-overlay
                  :show="OverlayFlag"
                  spinner-variant="primary"
                  spinner-type="grow"
                  spinner-small
                  rounded="sm"
                >
                  <!-- <div class="row mb-2">
                <div class="col-12">
                  <h5>{{ detail.lotto_type_name }}</h5>
                  <h5>วันที่ {{ formatDate(detail.closing_time) }}</h5>
                </div>
              </div> -->
                  <div id="special-div">
                    <b-card
                      text-variant="black"
                      border-variant="primary"
                      :style="{ 'background-color': detail.lotto_bg }"
                    >
                      <div class="text-start mb-2">
                        <!-- <img
                          src="@/assets/images/logo/logo-top.webp"
                          width="150"
                          class="float-right"
                          alt=""
                        /> -->
                        <div>
                          <b-button
                            type="submit"
                            variant="secondary"
                            size="sm"
                            class="mb-2"
                            @click="takeshot()"
                          >
                            คัดลอก
                          </b-button>
                          <!-- <button @click="takeshot()">คัดลอก</button> -->
                        </div>
                        <h5>{{ detail.lotto_type_name }}</h5>
                        <h5>วันที่ {{ formatDate(detail.closing_time) }}</h5>
                      </div>
                      <div style="overflow-x: auto">
                        <table>
                          <tbody>
                            <tr>
                              <td colspan="5">
                                <div class="pill-container-fast">
                                  <b-button
                                    type="submit"
                                    variant="outline-primary mr-1"
                                    :class="{
                                      'btn-primary': btnSelected == '2 ตัว',
                                    }"
                                    @click="selectedType('2 ตัว')"
                                    style="width: 80px"
                                  >
                                    2 ตัว
                                  </b-button>
                                  <b-button
                                    type="submit"
                                    variant="outline-primary mr-1"
                                    :class="{
                                      'btn-primary': btnSelected == '3 ตัว',
                                    }"
                                    @click="selectedType('3 ตัว')"
                                  >
                                    3 ตัว
                                  </b-button>
                                  <b-button
                                    type="submit"
                                    variant="outline-primary mr-1"
                                    :class="{
                                      'btn-primary': btnSelected == '6 กลับ',
                                    }"
                                    @click="selectedType('6 กลับ')"
                                  >
                                    6 กลับ
                                  </b-button>
                                  <b-button
                                    type="submit"
                                    variant="outline-primary mr-1"
                                    :class="{
                                      'btn-primary': btnSelected == '19 ประตู',
                                    }"
                                    @click="selectedType('19 ประตู')"
                                  >
                                    19 ประตู
                                  </b-button>
                                  <b-button
                                    type="submit"
                                    variant="outline-primary"
                                    :class="{
                                      'btn-primary': btnSelected == 'เลขวิ่ง',
                                    }"
                                    @click="selectedType('เลขวิ่ง')"
                                  >
                                    เลขวิ่ง
                                  </b-button>
                                </div>
                              </td>
                              <!-- <td>
                          <div class="pill-container-fast">
                            <b-button
                              type="submit"
                              variant="outline-primary"
                              :class="{ 'btn-primary': btnSelected == '3 ตัว' }"
                              @click="selectedType('3 ตัว')"
                            >
                              3 ตัว
                            </b-button>
                          </div>
                        </td>
                        <td>
                          <div class="pill-container-fast">
                            <b-button
                              type="submit"
                              variant="outline-primary"
                              :class="{
                                'btn-primary': btnSelected == '6 กลับ',
                              }"
                              @click="selectedType('6 กลับ')"
                            >
                              6 กลับ
                            </b-button>
                          </div>
                        </td>
                        <td>
                          <div class="pill-container-fast">
                            <b-button
                              type="submit"
                              variant="outline-primary"
                              :class="{
                                'btn-primary': btnSelected == '19 ประตู',
                              }"
                              @click="selectedType('19 ประตู')"
                            >
                              19 ประตู
                            </b-button>
                          </div>
                        </td>
                        <td>
                          <div class="pill-container-fast">
                            <b-button
                              type="submit"
                              variant="outline-primary"
                              :class="{
                                'btn-primary': btnSelected == 'เลขวิ่ง',
                              }"
                              @click="selectedType('เลขวิ่ง')"
                            >
                              เลขวิ่ง
                            </b-button>
                          </div>
                        </td> -->
                            </tr>
                            <tr>
                              <td>
                                <div class="pill-container-fast">
                                  <b-button
                                    type="submit"
                                    variant="outline-primary"
                                    :class="{
                                      'btn-primary': btnSelected == 'วินเลข',
                                    }"
                                    @click="selectedType('วินเลข')"
                                  >
                                    วินเลข
                                  </b-button>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="5">
                                <span
                                  v-for="(data, index) in lottoNumberAll"
                                  :key="index"
                                  class="badge bg-danger box-number"
                                  @click="delNumber(index)"
                                >
                                  {{ data.number }}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="5" v-if="btnSelected == '2 ตัว'">
                                <b-button
                                  type="submit"
                                  variant="outline-primary"
                                  size="sm"
                                  class="mt-3 mb-2"
                                  :class="{
                                    'btn-primary': btnSelected == 'เลขวิ่ง',
                                  }"
                                  @click="numberDouble('เลขวิ่ง')"
                                >
                                  เลขเบิ้ล
                                </b-button>
                              </td>
                              <td colspan="5" v-if="btnSelected == '3 ตัว'">
                                <b-button
                                  type="submit"
                                  size="sm"
                                  class="mt-3 mb-2"
                                  variant="outline-primary"
                                  :class="{
                                    'btn-primary': btnSelected == 'เลขวิ่ง',
                                  }"
                                  @click="numberTong('เลขวิ่ง')"
                                >
                                  เลขตอง
                                </b-button>
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 80px">
                                <!-- <input
                          type="text"
                          class="x-coupon-input form-control-price"
                          id="price"
                          name="price"
                          placeholder="เลข"
                          v-model="formFast.number"
                          style="width: 100%"
                          pattern="[0-9]*"
                          maxlength="3"
                          @input="fastKey(formFast, form.select)"
                        /> -->
                                <b-form-input
                                  id="price"
                                  type="text"
                                  placeholder="เลข"
                                  pattern="[0-9]*"
                                  ref="number"
                                  v-model="formFast.number"
                                  @input="fastKey(formFast)"
                                  @keyup.space="space6back(formFast)"
                                  style="width: 80px"
                                />
                              </td>

                              <td style="width: 80px">
                                <!-- <input
                          type="text"
                          class="x-coupon-input form-control-price"
                          id="price"
                          name="price"
                          placeholder="บน"
                          v-model="formFast.top"
                          style="width: 100%"
                          pattern="[0-9]*"
                          ref="top"
                        /> -->
                                <b-form-input
                                  id="price"
                                  type="text"
                                  placeholder="บน"
                                  pattern="[0-9]*"
                                  maxlength="4"
                                  v-model="formFast.top"
                                  ref="top"
                                  style="width: 80px"
                                  v-if="btnSelected != '6 กลับ'"
                                />
                                <b-form-input
                                  id="price"
                                  type="text"
                                  placeholder="บน"
                                  pattern="[0-9]*"
                                  maxlength="4"
                                  v-model="formFast.top"
                                  ref="top"
                                  style="width: 80px"
                                  @blur="addNumber(formFast)"
                                  v-else
                                />
                              </td>
                              <td
                                style="width: 80px"
                                v-if="btnSelected != '6 กลับ'"
                              >
                                <!-- <input
                          type="text"
                          class="x-coupon-input form-control-price"
                          id="price"
                          name="price"
                          placeholder="ล่าง"
                          v-model="formFast.bottom"
                          style="width: 100%"
                          pattern="[0-9]*"
                          ref="bottom"
                          @blur="addNumber(formFast, form.select)"
                        /> -->
                                <b-form-input
                                  id="price"
                                  type="text"
                                  placeholder="โต๊ด"
                                  pattern="[0-9]*"
                                  maxlength="4"
                                  v-model="formFast.bottom"
                                  ref="bottom"
                                  style="width: 80px"
                                  @blur="addNumber(formFast)"
                                  v-if="btnSelected == '3 ตัว'"
                                />
                                <b-form-input
                                  id="price"
                                  type="text"
                                  placeholder="ล่าง"
                                  pattern="[0-9]*"
                                  maxlength="4"
                                  v-model="formFast.bottom"
                                  ref="bottom"
                                  style="width: 80px"
                                  @blur="addNumber(formFast)"
                                  v-else
                                />
                              </td>
                              <td colspan="2">
                                <div class="pill-container-fast">
                                  <!-- <input
                            type="checkbox"
                            id="returnnumber"
                            name="returnnumber"
                            value="กลับเลข"
                            v-model="form.select"
                            @change="selectChoice()"
                          />
                          <label class="selector option-a" for="returnnumber">
                            <div>กลับเลข</div>
                          </label> -->
                                  <b-button
                                    type="submit"
                                    variant="outline-primary"
                                    :class="{
                                      'btn-primary': btnSelected == 'กลับเลข',
                                    }"
                                    @click="space6back(formFast)"
                                  >
                                    กลับเลข
                                  </b-button>
                                </div>
                              </td>
                            </tr>
                            <tr
                              v-if="
                                lottoNumberBill ? lottoNumberBill.length : 0 > 0
                              "
                            >
                              <td colspan="5">
                                <hr style="width: 100%" />
                              </td>
                            </tr>
                            <tr>
                              <td colspan="5">
                                <div
                                  class="card price-card"
                                  v-if="
                                    lottoNumberBill
                                      ? lottoNumberBill.length
                                      : 0 > 0
                                  "
                                >
                                  <div class="row">
                                    <!-- <div class="col-12 text-white">2 ตัว</div> -->
                                    <div
                                      v-for="(data, index) in lottoNumberBill"
                                      :key="'bill' + index"
                                      class="col-12"
                                    >
                                      <div class="row align-items-center">
                                        <div
                                          class="col-3 col-sm-3 col-md-3 text-center p-0"
                                        >
                                          <div>{{ data.type }}</div>
                                          <div v-if="data.type == '2 ตัว'">
                                            บน x ล่าง
                                          </div>
                                          <div v-else-if="data.type == '3 ตัว'">
                                            บน x ล่าง x โต๊ด
                                          </div>
                                          <div v-else-if="data.type == 'วิ่ง'">
                                            บน x ล่าง
                                          </div>
                                          <div v-if="data.type == '2 ตัว'">
                                            {{ data.top }} x {{ data.bottom }}
                                          </div>
                                          <div v-else-if="data.type == '3 ตัว'">
                                            {{ data.top }} x 0 x
                                            {{ data.bottom }}
                                          </div>
                                          <div v-if="data.type == 'วิ่ง'">
                                            {{ data.top }} x {{ data.bottom }}
                                          </div>
                                        </div>
                                        <div
                                          class="col-8 col-sm-8 col-md-8 box-lotto-number"
                                        >
                                          <span
                                            style="font-size: 15px"
                                            v-for="(item, index2) in data.data"
                                            :key="'bill3' + index2"
                                            @click="delNumber(item, index)"
                                          >
                                            {{ item.number }}
                                          </span>
                                        </div>
                                        <div class="col-1 col-sm-1 col-md-1">
                                          <b-button
                                            variant="gradient-danger"
                                            class="btn-icon rounded-circle"
                                            @click="delNumberSet(index)"
                                          >
                                            <feather-icon icon="Trash2Icon" />
                                          </b-button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <!-- <tr>
                        <td colspan="4">
                          <b-form-input
                            id="note"
                            type="text"
                            placeholder="หมายเหตุ"
                            v-model="form.note"
                          />
                        </td>
                      </tr> -->
                            <!-- <tr v-if="lottoNumberBill ? lottoNumberBill.length : 0 > 0">
                      <td colspan="4">
                        <hr />
                      </td>
                    </tr> -->
                          </tbody>
                        </table>
                      </div>
                    </b-card>
                    <div class="row">
                      <div class="col-9">
                        <b-form-input
                          id="note"
                          type="text"
                          placeholder="หมายเหตุ"
                          v-model="form.note"
                        />
                        <div class="text-center m-1">
                          <h6>
                            {{ detail.lotto_type_name }} ({{
                              formatDate(detail.closing_time)
                            }})
                          </h6>
                          <h5>รวม {{ numberWithCommas(grandTotalPrice) }}</h5>
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <b-button
                              type="submit"
                              variant="danger"
                              class="w-100"
                              @click="clearDataLotto"
                            >
                              ยกเลิก
                            </b-button>
                          </div>
                          <div class="col-6">
                            <b-button
                              type="submit"
                              variant="primary"
                              class="w-100"
                              @click="checkBill"
                            >
                              บันทึก
                            </b-button>
                          </div>
                        </div>
                      </div>
                      <div class="col-3 text-danger text-center">
                        <!-- <div>
                          <img
                            :src="base64Img"
                            width="80px"
                            alt=""
                            id="img-lotto"
                          />
                        </div> -->
                        เหลือเวลา
                        <span :id="'demo' + detail.lotto_type_id">
                          {{
                            countDown(detail.closing_time, detail.lotto_type_id)
                          }}
                        </span>
                      </div>
                    </div>
                  </div>
                </b-overlay>
              </div>
              <div class="col-12 col-md-6" v-else>
                <div style="overflow-x: auto; padding: 0">
                  <table class="table">
                    <thead>
                      <tr class="text-center">
                        <th style="padding-left: 40px; padding-right: 40px">
                          ประเภท @ หมายเลข
                        </th>
                        <th>ยอดเดิมพัน</th>
                        <th>เรทจ่าย</th>
                        <th>ส่วนลด</th>
                        <th>ลบโพย</th>
                      </tr>
                    </thead>
                    <tbody
                      v-for="(data, index) in lottoNumberBill"
                      :key="index"
                    >
                      <tr
                        v-for="(item, index2) in data.lotto"
                        :key="index2"
                        class="text-center"
                        :class="{
                          'bg-danger text-white': checkClosenumberActive(item),
                        }"
                      >
                        <td style="padding: 0">
                          <span v-if="checkClosenumberActive(item)">
                            ปิดรับ
                          </span>
                          <span
                            :class="{
                              'text-danger': !checkClosenumberActive(item),
                              'text-white': checkClosenumberActive(item),
                            }"
                            >{{ item.selected }}</span
                          >
                          @
                          <span
                            :class="{
                              'text-primary': !checkClosenumberActive(item),
                              'text-white': checkClosenumberActive(item),
                            }"
                            >{{ item.number }}</span
                          >
                        </td>
                        <td style="padding: 0">
                          {{ numberWithCommas(item.price) }}
                        </td>
                        <td style="padding: 0">
                          {{
                            checkClosenumberActive(item)
                              ? checkPay(item)
                              : numberWithCommas(item.pay)
                          }}
                        </td>
                        <td style="padding: 0">
                          {{ numberWithCommas(item.discount) }}
                        </td>
                        <td style="padding: 0">
                          <b-button
                            variant="gradient-danger"
                            class="btn-icon rounded-circle"
                            @click="delNumberCheck(index, index2)"
                          >
                            <feather-icon icon="Trash2Icon" />
                          </b-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="text-center m-1">
                  <h6>
                    {{ detail.lotto_type_name }} ({{
                      formatDate(detail.closing_time)
                    }})
                  </h6>
                  <h5>
                    ยอดเดิมพัน
                    {{ numberWithCommas(grandTotalPriceBill.price) }} บาท
                  </h5>
                  <h5>
                    ส่วนลด
                    <span class="text-danger">
                      {{ numberWithCommas(grandTotalPriceBill.discount) }}
                    </span>
                    บาท
                  </h5>
                  <h5>
                    รวม
                    <span class="text-primary">{{
                      numberWithCommas(grandTotalPriceBill.grandTotalPrice)
                    }}</span>
                    บาท
                  </h5>
                  <h6>หมายเหตุ {{ form.note }}</h6>
                </div>
                <div class="row">
                  <div class="col-4">
                    <b-button
                      type="submit"
                      variant="danger"
                      class="w-100"
                      @click="clearDataLotto"
                    >
                      ยกเลิก
                    </b-button>
                  </div>
                  <div class="col-4">
                    <b-button
                      type="submit"
                      variant="secondary"
                      class="w-100"
                      @click="checkBill"
                    >
                      ย้อนกลับ
                    </b-button>
                  </div>
                  <div class="col-4">
                    <b-button
                      type="submit"
                      variant="primary"
                      class="w-100"
                      @click="onSubmit"
                    >
                      บันทึก
                    </b-button>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="row">
                  <div class="col-12 mb-2 mt-2">
                    <b-card text-variant="black" border-variant="primary">
                      <b-overlay
                        :show="OverlayFlagClose"
                        spinner-variant="primary"
                        spinner-type="grow"
                        spinner-small
                        rounded="sm"
                      >
                        <div>เลขปิดรับ</div>
                        <hr />
                        <div
                          v-for="(data, index) in closeLottoAll"
                          :key="index"
                        >
                          <div class="mb-1 mt-1">
                            {{ data.program }}
                          </div>
                          <div class="row">
                            &nbsp;&nbsp;&nbsp;
                            <div
                              style="padding-left: 5px; padding-right: 5px"
                              v-for="(item, index2) in data.data"
                              :key="index2"
                            >
                              <span>{{ item.number }} </span>
                            </div>
                          </div>
                          <hr />
                          <!-- <table class="table">
                        <thead>
                          <tr class="text-center">
                            <th>เวลาแทง</th>
                            <th>หวย</th>
                            <th>รายการ</th>
                            <th>รวม</th>
                            <th>หมายเหตุ</th>
                            <th>สถานะ</th>
                            <th>ลบโพย</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(data, index) in bill"
                            :key="index"
                            class="text-center"
                            :class="{
                              'bg-success text-white':
                                data.sum_prize != null && data.status_result,
                            }"
                          >
                            <td style="padding: 0">
                              {{ formatDateTime(data.created_at) }}
                            </td>
                            <td style="padding: 0">
                              {{ data.lotto_type_name }}
                            </td>
                            <td style="padding: 0">{{ data.lotto_total }}</td>
                            <td style="padding: 0">
                              {{ numberWithCommas(data.total) }}
                            </td>
                            <td
                              style="padding: 0"
                              @click="showModalBill(data.poy_code)"
                            >
                              <a>{{ data.note }}</a>
                            </td>
                            <td style="padding: 0">
                              <span
                                v-if="data.status == 'SUC'"
                                class="badge bg-success"
                                >สำเร็จ</span
                              >
                              <span
                                v-if="data.status == 'CAN'"
                                class="badge bg-danger"
                                >ยกเลิกโพย</span
                              >
                            </td>
                            <td style="padding: 0">
                              <b-button
                                variant="gradient-danger"
                                class="btn-icon rounded-circle"
                                @click="onSubmitCancel(data)"
                              >
                                <feather-icon icon="Trash2Icon" />
                              </b-button>
                            </td>
                          </tr>
                        </tbody>
                      </table> -->
                        </div>
                      </b-overlay>
                    </b-card>
                  </div>
                  <div class="col-12 mb-2">
                    <b-overlay
                      :show="OverlayFlagNumberBuy"
                      spinner-variant="primary"
                      spinner-type="grow"
                      spinner-small
                      rounded="sm"
                    >
                      <div>รายการเลขซื้อมากที่สุด (10 รายการ)</div>
                      <div style="overflow-x: auto; padding: 0">
                        <table class="table">
                          <thead>
                            <tr class="text-center">
                              <th>ประเภทเลข</th>
                              <th>เลขมาแรง</th>
                              <th>รายการ</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(data, index) in numberBuy"
                              :key="index"
                              class="text-center"
                            >
                              <td style="padding: 0">
                                {{ data.type_option }}
                              </td>
                              <td style="padding: 0">
                                {{ data.number }}
                              </td>
                              <td style="padding: 0">{{ data.count }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </b-overlay>
                  </div>
                  <div class="col-12">
                    <b-overlay
                      :show="OverlayFlagDetail"
                      spinner-variant="primary"
                      spinner-type="grow"
                      spinner-small
                      rounded="sm"
                    >
                      <div>รายการบิลล่าสุด (20 รายการ)</div>
                      <div style="overflow-x: auto; padding: 0">
                        <table class="table">
                          <thead>
                            <tr class="text-center">
                              <th>เวลาแทง</th>
                              <th>หวย</th>
                              <th>รายการ</th>
                              <th>รวม</th>
                              <th>หมายเหตุ</th>
                              <th>สถานะ</th>
                              <th>ลบโพย</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(data, index) in bill"
                              :key="index"
                              class="text-center"
                              :class="{
                                'bg-success text-white':
                                  data.sum_prize != null && data.status_result,
                              }"
                            >
                              <td style="padding: 0">
                                {{ formatDateTime(data.created_at) }}
                              </td>
                              <td style="padding: 0">
                                {{ data.lotto_type_name }}
                              </td>
                              <td style="padding: 0">{{ data.lotto_total }}</td>
                              <td style="padding: 0">
                                {{ numberWithCommas(data.total) }}
                              </td>
                              <td
                                style="padding: 0"
                                @click="showModalBill(data.poy_code)"
                              >
                                <a>{{ data.note }}</a>
                              </td>
                              <td style="padding: 0">
                                <span
                                  v-if="data.status == 'SUC'"
                                  class="badge bg-success"
                                  >สำเร็จ</span
                                >
                                <span
                                  v-if="data.status == 'CAN'"
                                  class="badge bg-danger"
                                  >ยกเลิกโพย</span
                                >
                              </td>
                              <td style="padding: 0">
                                <b-button
                                  variant="gradient-danger"
                                  class="btn-icon rounded-circle"
                                  @click="onSubmitCancel(data)"
                                >
                                  <feather-icon icon="Trash2Icon" />
                                </b-button>
                              </td>

                              <!-- <td style="padding: 0">
                        <button
                          class="btn-sm btn-primary"
                          @click="showModalBill(data.poy_code)"
                        >
                          ดูโพย
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
                        {{ resultTotal("ดาวโจนส์") }}
                      </td>
                      <td style="padding: 0" class="text-danger">
                        {{ resultDiscount("ดาวโจนส์") }}
                      </td>
                      <td style="padding: 0" class="text-success">
                        {{ resultTotalPrice("ดาวโจนส์") }}
                      </td>
                      <td style="padding: 0" class="text-success">
                        {{ resultPrize("ดาวโจนส์") }}
                      </td>

                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tfoot> -->
                        </table>
                        <!-- <table class="table">
                  <tbody>
                    <tr class="text-center">
                      <th style="padding: 0">เวลาแทง</th>
                      <th style="padding: 0">หวย</th>
                      <th style="padding: 0">รายการ</th>
                      <th style="padding: 0">รวม</th>
                      <th style="padding: 0">หมายเหตุ</th>
                      <th style="padding: 0">ลบโพย</th>
                    </tr>
                    <tr v-for="(data, index) in bill" :key="index">
                      <td style="padding: 0">
                        {{ formatDateTime(data.created_at) }}
                      </td>
                      <td style="padding: 0">{{ data.lotto_type_name }}</td>
                      <td style="padding: 0">{{ data.lotto_total }}</td>
                      <td style="padding: 0">
                        {{ numberWithCommas(data.total) }}
                      </td>
                      <td style="padding: 0">{{ data.note }}</td>
                      <td style="padding: 0">
                        <b-button
                          variant="gradient-danger"
                          class="btn-icon rounded-circle"
                          @click="delNumberSet(index)"
                        >
                          <feather-icon icon="Trash2Icon" />
                        </b-button>
                      </td>
                    </tr>
                  </tbody>
                </table> -->
                      </div>
                    </b-overlay>
                  </div>
                </div>
              </div>
            </div>
          </b-card-code>
        </b-overlay>
      </b-col>
    </b-row>
    <b-modal
      id="modal-dark"
      modal-class="modal-dark"
      ref="modalBill"
      cancel-variant="outline-secondary"
      centered
      hide-footer
      size="lg"
      title="โพย"
    >
      <!-- no-close-on-backdrop -->
      <div style="overflow-x: auto; padding: 0">
        <table class="table">
          <thead>
            <tr class="text-center">
              <th>ลำดับ</th>
              <th>ประเภท</th>
              <th>หมายเลข</th>
              <th>ยอดแทง</th>
              <th>ส่วนลด</th>
              <th>จ่าย</th>
              <th>รวม</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data, index) in detailBill"
              :key="index"
              class="text-center"
              :class="{
                'bg-success text-white': data.status == 'suc',
                'bg-danger text-white': data.status == 'close',
              }"
            >
              <td style="padding: 0">{{ index + 1 }}</td>
              <td style="padding: 0">{{ data.type_option }}</td>
              <td style="padding: 0">{{ data.number }}</td>
              <td style="padding: 0">{{ numberWithCommas(data.price) }}</td>
              <td style="padding: 0">{{ numberWithCommas(data.discount) }}</td>
              <td style="padding: 0">{{ numberWithCommas(data.pay) }}</td>
              <td style="padding: 0">{{ numberWithCommas(data.total) }}</td>
              <td>
                <span class="text-white" v-if="data.status == 'suc'"
                  >ถูกรางวัล</span
                >
                <span class="text-danger" v-else-if="data.status == 'fail'"
                  >ไม่ถูกรางวัล</span
                >
                <span class="text-white" v-else-if="data.status == 'close'"
                  >เลขปิดรับ</span
                >
                <span class="text-warning" v-else>รอผล</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="text-center">
              <td>รวม</td>
              <td></td>
              <td></td>
              <td style="padding: 0" class="text-success">
                <!-- {{ sumAll }} -->
                {{ numberWithCommas(sumAll.price) }}
              </td>
              <td style="padding: 0" class="text-danger">
                {{ numberWithCommas(sumAll.discount) }}
              </td>
              <td style="padding: 0"></td>
              <td style="padding: 0" class="text-primary">
                {{ numberWithCommas(sumAll.total) }}
              </td>
              <td style="padding: 0" class="text-success">
                {{ numberWithCommas(sumAll.prize) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </b-modal>
  </section>
</template>

<script>
import BCardCode from "@core/components/b-card-code";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BOverlay,
  BFormFile,
  BCard,
  BModal,
} from "bootstrap-vue";
import { mapGetters } from "vuex";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import moment from "moment";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, integer } from "@validations";
import { HTTP } from "@/services/http-common";
import html2canvas from "html2canvas";

export default {
  components: {
    BCardCode,
    BRow,
    BCol,
    BCard,
    BFormGroup,
    BOverlay,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BModal,
    BFormFile,
    flatPickr,
    vSelect,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      option: [],
      // validation
      required,
      integer,
      OverlayFlag: false,
      OverlayFlagDetail: false,
      OverlayFlagClose: false,
      OverlayFlagSave: false,
      checkBillsubmit: false,
      form: {
        dateDefault: "",
        selected: "",
        lotto_type_name: "",
        set: "",
        lotteryNumber: "",
        lotteryImg: null,
      },
      rows: [],
      lottoNumberAll: [],
      lottoNumberBill: [],
      formFast: { number: "", top: "", bottom: "" },
      url: "",
      btnSelected: "2 ตัว",
      detail: "",
      grandTotalPrice: 0,
      grandTotalPriceBill: { price: 0, grandTotalPrice: 0, discount: 0 },
      bill: [],
      detailBill: [],
      closeNumber: [],
      sumAll: "",
      closeLotto: [],
      closeLottoAll: [],
      numberBuy: [],
      base64Img: "",
    };
  },
  created() {
    this.getData();
    this.getDataBill();
    this.getDataType();
    this.fetchRate();
    this.onClickPlay(this.$route.params.huayId);
    this.fetchCloseLotto();
    this.getDataNumberBuy();
  },
  methods: {
    getData() {
      this.isLoading = true;
      HTTP.get("api/lotto-type")
        .then((response) => {
          this.rows = response.data.data;
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
    getDataBill() {
      this.OverlayFlagDetail = true;
      HTTP.get("api/lotto/bill")
        .then((response) => {
          this.bill = response.data.data;
          this.OverlayFlagDetail = false;
        })
        .catch((err) => {
          this.showToast(
            err.response.data.msg != undefined
              ? err.response.data.msg
              : "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณาลองใหม่",
            "danger"
          );
          this.OverlayFlagDetail = false;
        });
    },
    getDataNumberBuy() {
      this.OverlayFlagNumberBuy = true;
      HTTP.get("api/admin/get-number-buy", {
        params: {
          lotto_type_id: this.$route.params.huayId,
          date: this.filterDate(this.detail.closing_time),
        },
      })
        .then((response) => {
          this.numberBuy = response.data.data;
          this.OverlayFlagNumberBuy = false;
        })
        .catch((err) => {
          this.showToast(
            err.response.data.msg != undefined
              ? err.response.data.msg
              : "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณาลองใหม่",
            "danger"
          );
          this.OverlayFlagNumberBuy = false;
        });
    },
    fetchRate() {
      HTTP.get(`api/rate`, {
        params: { lotto_type_id: this.$route.params.huayId },
      })
        .then((resp) => {
          if (resp.data.status != undefined && !resp.data.status) {
            this.showToast(
              resp.data.msg != undefined
                ? resp.data.msg
                : "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณาลองใหม่",
              "danger"
            );
          } else {
            this.detail = resp.data.detail;
            this.base64Img = this.getBase64Image(this.detail.lotto_type_img);
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 403) {
              this.$store.dispatch("logoutAuth");
            } else {
              this.showToast(
                err.response.data.msg != undefined
                  ? err.response.data.msg
                  : "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณาลองใหม่",
                "danger"
              );
              this.$router.go(-1);
            }
          }
        });
    },
    onClickPlay(id) {
      //   if (this.Auth.loggedIn) {
      HTTP.get(`api/get-status`, {
        params: { type_id: id },
      })
        .then((resp) => {
          if (resp.data.status) {
            this.$router
              .push({
                name: "playlotto",
                params: { huayId: id },
              })
              .catch(() => {});
          } else {
            this.$router.push({
              name: "lotto",
            });
            this.showToast(resp.data.msg, "danger");
          }
        })
        .catch((err) => {
          this.showToast(err.response.data.msg, "danger");
          this.$router.push({
            name: "lotto",
          });
        });
      //   }
    },
    calcu() {
      // let totalPrice = 0;
      let grandTotalPrice = 0;
      let discount = 0;
      let price = 0;
      this.lottoNumberBill.forEach((item) => {
        // item.data.forEach((el) => {
        //   totalPrice += parseFloat(el.top) + parseFloat(el.bottom);
        // });
        item.lotto.forEach((element) => {
          grandTotalPrice +=
            parseFloat(element.price) - parseFloat(element.discount);
          discount += parseFloat(element.discount);
          price += parseFloat(element.price);
        });
      });
      this.grandTotalPriceBill = { price, grandTotalPrice, discount };
    },
    checkBill() {
      if (this.lottoNumberBill.length > 0) {
        if (!this.checkBillsubmit) {
          this.checkBillsubmit = true;
          this.checkClosenumber();
        } else {
          this.checkBillsubmit = false;
        }
      } else {
        this.showToast("กรุณากรอกเลขหวยก่อน", "danger");
      }
    },
    async takeshot() {
      let specialDiv = document.getElementById("special-div");
      await html2canvas(specialDiv).then((canvas) => {
        var myImage = canvas.toDataURL("image/png");
        // document
        //   .getElementById("special-div")
        //   .setAttribute("data-taget", myImage);
        localStorage.setItem("CopyImgBase64", myImage);
      });
      await this.copyPicture();
    },
    async copyPicture() {
      // this.takeshot();
      // var imgBase64 = document
      //   .getElementById("special-div")
      //   .getAttribute("data-taget");
      // var arrow = await document.querySelector("#special-div").dataset.taget;
      const imgBase64 = localStorage.getItem("CopyImgBase64");
      try {
        // var imgBase64 = this.takeshot();
        const response = await fetch(imgBase64);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        this.showToast("คัดลอกสำเร็จ", "success");
      } catch (err) {
        console.error(err.name, err.message);
      }
    },
    checkClosenumberActive(data) {
      var dis = false;
      var close = this.closeNumber.filter(
        (el) => el.number == data.number && el.type == data.selected
      );
      if (close != "") {
        dis = true;
        // data.price = 0;
        // data.pay = 0;
        // data.discount = 0;
      }
      return dis;
    },
    onSubmit() {
      this.OverlayFlagSave = true;
      if (this.lottoNumberBill.length > 0) {
        const arrayLotto = [];
        this.lottoNumberBill.forEach((item) => {
          item.lotto.forEach((element) => {
            var close = this.closeNumber.filter(
              (el) =>
                el.number == element.number &&
                el.type == element.selected &&
                el.limit <= element.price
            );

            arrayLotto.push({
              discount: element.discount,
              number: element.number,
              pay: close.length > 0 ? close[0].pay : element.pay,
              price: element.price,
              selected: element.selected,
            });
          });
        });
        // this.checkPrice();
        //   if (this.Form.Price != "") {
        this.isLoading = true;
        // document.getElementById("submitCode").disabled = true;
        HTTP.post(`api/lotto/add-lotto`, {
          number: arrayLotto,
          lotto_type_id: this.$route.params.huayId,
          note: this.form.note,
        })
          .then((resp) => {
            // document.getElementById("submitCode").disabled = false;
            if (resp.data.status != undefined && !resp.data.status) {
              this.$toast.error(
                resp.data.msg != undefined
                  ? resp.data.msg
                  : "ไม่สามารถทำรายการได้ กรุณาลองใหม่"
              );
              this.OverlayFlagSave = false;
            } else {
              this.showToast("ส่งโพยสำเร็จ", "success");
              this.lottoNumberBill = [];
              this.form.note = "";
              this.calculatePrice();
              this.getDataBill();
              this.fetchUserProfile();
              this.OverlayFlagSave = false;
              this.checkBillsubmit = false;
            }
          })
          .catch((err) => {
            // document.getElementById("submitCode").disabled = false;
            if (err.response) {
              if (err.response.status === 403) {
                this.$store.dispatch("logoutAuth");
              } else {
                this.showToast(
                  err.response.data.msg != undefined
                    ? err.response.data.msg
                    : "ไม่สามารถทำรายการได้ กรุณาลองใหม่",
                  "danger"
                );
              }
            }
            this.OverlayFlagSave = false;
          })
          .then(() => {
            this.OverlayFlagSave = false;
          });
      } else {
        this.showToast("กรุณากรอกหวยก่อน", "danger");
        this.OverlayFlagSave = false;
      }
    },
    calculatePrice() {
      if (this.lottoNumberBill) {
        let totalPrice = 0;
        let grandTotalPrice = 0;
        let discount = 0;
        let price = 0;
        this.lottoNumberBill.forEach((item) => {
          item.data.forEach((el) => {
            totalPrice += parseFloat(el.top) + parseFloat(el.bottom);
          });
          item.lotto.forEach((element) => {
            grandTotalPrice +=
              parseFloat(element.price) - parseFloat(element.discount);
            discount += parseFloat(element.discount);
            price += parseFloat(element.price);
          });
        });
        this.grandTotalPrice = totalPrice;
        this.grandTotalPriceBill = { price, grandTotalPrice, discount };
      }
    },
    checkPay(item) {
      var close = this.closeNumber.filter(
        (el) =>
          el.number == item.number &&
          el.type == item.selected &&
          el.limit <= item.price
      );

      return close ? close[0].pay.toFixed(2) : item.pay.toFixed(2);
    },
    checkClosenumber() {
      // this.isLoading = true;
      const arrNumber = [];
      this.lottoNumberBill.forEach((data) => {
        data.lotto.forEach((item) => {
          var close = this.closeNumber.filter(
            (el) =>
              el.number == item.number &&
              el.type == item.selected &&
              el.limit <= item.price
          );

          arrNumber.push({
            discount: item.discount,
            number: item.number,
            pay: close.length > 0 ? close[0].pay : item.pay,
            price: item.price,
            selected: item.selected,
          });
        });
      });
      HTTP.post(`api/close-number`, {
        number: arrNumber,
        lotto_type_id: this.$route.params.huayId,
      })
        .then((resp) => {
          if (resp.data.data != "") {
            this.closeNumber = resp.data.data;

            // setTimeout(function () {
            //   this.calculatePrice();
            // }, 300);
            this.showToast(resp.data.msg, "danger");
            let grandTotalPrice = 0;
            let discount = 0;
            let price = 0;
            this.lottoNumberBill.forEach((item) => {
              item.lotto.forEach((element) => {
                var close = this.closeNumber.filter((el) => {
                  el.number == element.number &&
                    el.type == element.selected &&
                    el.limit <= element.price;
                });
                if (close == "") {
                  grandTotalPrice +=
                    parseFloat(element.price) - parseFloat(element.discount);
                  discount += parseFloat(element.discount);
                  price += parseFloat(element.price);
                } else {
                  element.price = close[0].price;
                  element.pay = close[0].pay;
                  element.discount = 0;
                }
              });
            });
            this.grandTotalPriceBill = { price, grandTotalPrice, discount };
            // this.calculatePrice();
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 403) {
              this.$store.dispatch("logoutAuth");
            } else {
              this.showToast(
                err.response.data.msg != undefined
                  ? err.response.data.msg
                  : "ไม่สามารถทำรายการได้ กรุณาลองใหม่",
                "danger"
              );
            }
          }
        });
    },
    numberWithCommas(x) {
      return parseFloat(x)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    onSubmitCancel(data) {
      this.isLoading = true;
      // document.getElementById("submitCode").disabled = true;
      HTTP.post(`api/lotto/cancel-lotto`, {
        billCode: data.poy_code,
        lotto_type_id: data.lotto_type_id,
      })
        .then((resp) => {
          // document.getElementById("submitCode").disabled = false;
          this.showToast(
            resp.data.msg != undefined
              ? resp.data.msg
              : "ไม่สามารถทำรายการได้ กรุณาลองใหม่",
            "success"
          );
          this.getDataBill();
          this.fetchUserProfile();
        })
        .catch((err) => {
          // document.getElementById("submitCode").disabled = false;
          if (err.response) {
            if (err.response.status === 403) {
              this.$store.dispatch("logoutAuth");
            } else {
              this.showToast(
                err.response.data.msg != undefined
                  ? err.response.data.msg
                  : "ไม่สามารถทำรายการได้ กรุณาลองใหม่",
                "danger"
              );
            }
          }
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    fetchPoyDetail(bill) {
      this.isLoading = true;
      HTTP.get("api/admin/prize/detail-prize-result", {
        params: {
          // search: this.searchTerm,
          billCode: bill,
        },
      })
        .then((response) => {
          this.detailBill = response.data.data;
          if (this.detailBill) {
            let price = 0;
            let discount = 0;
            let pay = 0;
            let total = 0;
            let prize = 0;
            this.detailBill.forEach((item) => {
              if (item.status != "close") {
                price += item.price;
                discount += item.discount;
              }
              pay += item.pay;
              if (item.status != "close") {
                total += item.total;
              }
              if (item.status == "suc") {
                prize += item.price * item.pay;
              }
            });
            this.sumAll = { price, discount, pay, total, prize };
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.showToast(error.response.data.msg, "danger");
          this.isLoading = false;
        });
    },
    fetchCloseLotto() {
      this.OverlayFlagClose = true;
      HTTP.get("api/close-number/all", {
        params: {
          // search: this.searchTerm,
          lotto_type_id: this.$route.params.huayId,
        },
      })
        .then((response) => {
          this.closeLotto = response.data.data;
          if (this.closeLotto != "") {
            const lotto = [];
            const matches = this.closeLotto.map((item) => item.type);
            let program = [...new Set(matches)];
            // const dataNew = [];
            for (let i = 0; i < program.length; i++) {
              const item = program[i];
              const result = this.closeLotto.filter((el) => el.type === item);
              lotto.push({ program: item, data: result });
            }
            this.closeLottoAll = lotto;
            // return lotto;
          }
          this.OverlayFlagClose = false;
        })
        .catch((error) => {
          this.showToast(error.response.data.msg, "danger");
          this.OverlayFlagClose = false;
        });
    },
    getDataType() {
      this.isLoading = true;
      HTTP.get("api/type")
        .then((response) => {
          this.option = response.data.data;
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
    validationForm() {
      this.$refs.addLotteryForm.validate().then((success) => {
        if (success) {
          if (this.form.dateDefault != null) {
            if (this.form.lotteryImg != null) {
              //   let installment = parseInt(this.form.installment);
              //   let set = parseInt(this.form.set);
              //   let lotterNumber = parseInt(this.form.lotteryNumber);
              let formData = new FormData();
              formData.append("file", this.form.lotteryImg);
              formData.append(
                "type_id",
                this.form.selected != null
                  ? this.form.selected.type_id
                  : undefined
              );
              formData.append("name", this.form.lotto_type_name);
              formData.append("closing_time", this.form.dateDefault);

              HTTP.post(`api/lotto-type/add-lotto-type`, formData, {
                // headers: {
                //   "Content-Type": "multipart/form-data",
                //   Authorization: "Bearer " + localStorage.getItem("bb_token"),
                // },
              })
                .then((resp) => {
                  if (
                    resp.data.status != undefined &&
                    resp.data.status === "error"
                  ) {
                    this.showToast(
                      resp.data.message != undefined
                        ? resp.data.message
                        : "ไม่สามารถทำรายการได้ กรุณาลองใหม่",
                      "danger"
                    );
                  } else {
                    this.showToast("เพิ่มลอตเตอรี่สำเร็จ", "success");
                  }
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
                    }
                  }
                });
            } else {
              this.showToast("กรุณาเลือกรูปภาพ", "danger");
            }
          } else {
            this.showToast("กรอกข้อมูลให้ครบถ้วน", "danger");
          }
        }
      });
    },
    onFileChange(files) {
      const file = files.target.files[0];
      if (file) {
        this.url = URL.createObjectURL(file);
      }
      this.form.lotteryImg = file;
    },
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
    fetchUserProfile() {
      HTTP.get(`/api/auth/profile`)
        .then((resp) => {
          if (resp.data.status != undefined && !resp.data.status) {
            this.$toast.error(
              resp.data.msg != undefined
                ? resp.data.msg
                : "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณาลองใหม่"
            );
          } else {
            this.$store.dispatch("setUser", resp.data.data);
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 403) {
              this.$store.dispatch("logoutAuth");
            } else {
              this.$toast.error(
                err.response.data.msg != undefined
                  ? err.response.data.msg
                  : "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณาลองใหม่"
              );
            }
          }
        });
    },
    addNumber(form) {
      if (this.btnSelected && this.lottoNumberAll != "") {
        if (
          form.top != "" ||
          parseFloat(form.top) > 0 ||
          form.bottom != "" ||
          parseFloat(form.bottom) > 0
        ) {
          const arr = [];
          const arrLotto = [];
          let pay = 0;
          if (
            this.detail.lotto_type_name == "รัฐบาลไทย" ||
            this.detail.lotto_type_name == "ออมสิน"
          ) {
            pay = 95;
          } else {
            pay = 100;
          }
          /////////////////// add data to array ///////////////////
          this.lottoNumberAll.forEach((item, index) => {
            this.lottoNumberAll[index].top = form.top != "" ? form.top : 0;
            this.lottoNumberAll[index].bottom =
              form.bottom != "" ? form.bottom : 0;
            arr.push(item);
            if (this.btnSelected == "2 ตัว") {
              if (form.top) {
                arrLotto.push({
                  discount: 0,
                  number: item.number,
                  pay: pay,
                  price: parseFloat(form.top),
                  selected: "2 ตัวบน",
                });
              }
              if (form.bottom) {
                arrLotto.push({
                  discount: 0,
                  number: item.number,
                  pay: pay,
                  price: parseFloat(form.bottom),
                  selected: "2 ตัวล่าง",
                });
              }
            }
            if (this.btnSelected == "3 ตัว") {
              if (form.top) {
                arrLotto.push({
                  discount: 0,
                  number: item.number,
                  pay: 750,
                  price: parseFloat(form.top),
                  selected: "3 ตัวบน",
                });
              }
              if (form.bottom) {
                arrLotto.push({
                  discount: 0,
                  number: item.number,
                  pay: 125,
                  price: parseFloat(form.bottom),
                  selected: "3 ตัวโต๊ด",
                });
              }
            }
            if (this.btnSelected == "6 กลับ") {
              if (form.top) {
                arrLotto.push({
                  discount: 0,
                  number: item.number,
                  pay: 750,
                  price: parseFloat(form.top),
                  selected: "3 ตัวบน",
                });
              }
              if (form.bottom) {
                arrLotto.push({
                  discount: 0,
                  number: item.number,
                  pay: 125,
                  price: parseFloat(form.bottom),
                  selected: "3 ตัวโต๊ด",
                });
              }
            }
            if (this.btnSelected == "19 ประตู") {
              if (form.top) {
                arrLotto.push({
                  discount: 0,
                  number: item.number,
                  pay: 100,
                  price: parseFloat(form.top),
                  selected: "2 ตัวบน",
                });
              }
              if (form.bottom) {
                arrLotto.push({
                  discount: 0,
                  number: item.number,
                  pay: 100,
                  price: parseFloat(form.bottom),
                  selected: "2 ตัวล่าง",
                });
              }
            }
            if (this.btnSelected == "เลขวิ่ง") {
              if (form.top) {
                arrLotto.push({
                  discount: 0,
                  number: item.number,
                  pay: 3,
                  price: parseFloat(form.top),
                  selected: "วิ่งบน",
                });
              }
              if (form.bottom) {
                arrLotto.push({
                  discount: 0,
                  number: item.number,
                  pay: 4,
                  price: parseFloat(form.bottom),
                  selected: "วิ่งล่าง",
                });
              }
            }
          });
          /////////////////// add data to array ///////////////////
          /////////////////// add data to lottoNumberBill ///////////////////
          if (this.btnSelected == "2 ตัว") {
            this.lottoNumberBill.push({
              data: arr,
              lotto: arrLotto,
              number: form.number,
              type: "2 ตัว",
              top: form.top != "" ? form.top : 0,
              bottom: form.bottom != "" ? form.bottom : 0,
            });
          }
          if (this.btnSelected == "3 ตัว") {
            this.lottoNumberBill.push({
              data: arr,
              lotto: arrLotto,
              type: "3 ตัว",
              top: form.top != "" ? form.top : 0,
              bottom: form.bottom != "" ? form.bottom : 0,
            });
          }
          if (this.btnSelected == "6 กลับ") {
            this.lottoNumberBill.push({
              data: arr,
              lotto: arrLotto,
              type: "3 ตัว",
              top: form.top != "" ? form.top : 0,
              bottom: form.bottom != "" ? form.bottom : 0,
            });
          }
          if (this.btnSelected == "19 ประตู") {
            this.lottoNumberBill.push({
              data: arr,
              lotto: arrLotto,
              type: "2 ตัว",
              top: form.top != "" ? form.top : 0,
              bottom: form.bottom != "" ? form.bottom : 0,
            });
          }
          if (this.btnSelected == "เลขวิ่ง") {
            this.lottoNumberBill.push({
              data: arr,
              lotto: arrLotto,
              type: "วิ่ง",
              top: form.top != "" ? form.top : 0,
              bottom: form.bottom != "" ? form.bottom : 0,
            });
          }
          /////////////////// add data to lottoNumberBill ///////////////////
          this.lottoNumberAll = [];
          this.$refs.number.focus();
          if (this.lottoNumberBill) {
            this.calculatePrice();
          }
          this.formFast.top = "";
          this.formFast.bottom = "";
        } else {
          this.showToast("กรุณาใส่ราคาตั้งแต่ 1 บาทขึ้นไป", "danger");
        }
      }
    },
    async getBase64Image(img) {
      const data = await fetch(img);
      const blob = await data.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          document.getElementById("img-lotto").src = base64data;
          // console.log(base64data);
          resolve(base64data);
          // return base64data;
        };
      });
      // return getBase64FromUrl;
      // return dataURL.replace(/^data:image\/?[A-z]*;base64,/);
    },
    func19door(num) {
      const result = [];
      for (let i = 0; i < 10; i++) {
        // const element = array[index];
        result.push(`${num}${i}`);
      }
      result.forEach((item) => {
        result.push(item.toString().split("").reverse().join(""));
      });
      let dup = [...new Set(result)];
      return dup;
    },
    delNumber(index) {
      //   this.lottoNumberAll = this.lottoNumberAll.filter((el) => {
      //     if (el.number === data.number && el.selected === data.selected) {
      //       return false;
      //     } else {
      //       return true;
      //     }
      //   });
      this.lottoNumberAll.splice(index, 1);
    },
    numberDouble() {
      const num = ["00", "11", "22", "33", "44", "55", "66", "77", "88", "99"];
      num.forEach((item) => {
        this.lottoNumberAll.push({
          number: item,
          top: 0,
          bottom: 0,
          selected: "2 ตัว",
        });
      });
    },
    numberTong() {
      const num = [
        "000",
        "111",
        "222",
        "333",
        "444",
        "555",
        "666",
        "777",
        "888",
        "999",
      ];
      num.forEach((item) => {
        this.lottoNumberAll.push({
          number: item,
          top: 0,
          bottom: 0,
          selected: "3 ตัว",
        });
      });
    },
    delNumberCheck(index, index2) {
      this.lottoNumberBill[index].lotto.splice(index2, 1);
      this.calculatePrice();
    },
    delNumberSet(index) {
      this.lottoNumberBill.splice(index, 1);
      this.calculatePrice();
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
    fastKey(form) {
      var number = parseInt(form.number);
      if (!isNaN(number)) {
        if (this.btnSelected == "2 ตัว") {
          if (form.number.length == 2) {
            // this.$refs.bottom.focus();
            this.lottoNumberAll.push({
              number: form.number,
              top: 0,
              bottom: 0,
              selected: "2 ตัว",
            });
            this.formFast.number = "";
          }
          if (form.number.length > 2) {
            const arrNumber = form.number.split(/[, -/*~(_)]+/);
            arrNumber.forEach((item) => {
              if (item.length == 2) {
                this.lottoNumberAll.push({
                  number: item,
                  top: 0,
                  bottom: 0,
                  selected: "2 ตัว",
                });
              }
            });
            setTimeout(function () {
              form.number = "";
            }, 100);
          }
        } else if (this.btnSelected == "3 ตัว") {
          if (form.number.length == 3) {
            this.lottoNumberAll.push({
              number: form.number,
              top: 0,
              bottom: 0,
              selected: "3 ตัว",
            });
            this.formFast.number = "";
          }
          if (form.number.length > 3) {
            const arrNumber = form.number.split(/[, -/*~(_)]+/);
            arrNumber.forEach((item) => {
              if (item.length == 3) {
                this.lottoNumberAll.push({
                  number: item,
                  top: 0,
                  bottom: 0,
                  selected: "3 ตัว",
                });
              }
            });
            setTimeout(function () {
              form.number = "";
            }, 100);
          }
        } else if (this.btnSelected == "6 กลับ") {
          if (form.number.length == 3) {
            let result = this.func6back(form.number);
            result.forEach((item) => {
              this.lottoNumberAll.push({
                number: item,
                top: 0,
                bottom: 0,
                selected: "3 ตัว",
              });
            });
            this.formFast.number = "";
          }
          if (form.number.length > 3) {
            const arrNumber = form.number.split(/[, -/*~(_)]+/);
            arrNumber.forEach((data) => {
              if (data.length == 3) {
                let result = this.func6back(data);
                result.forEach((item) => {
                  this.lottoNumberAll.push({
                    number: item,
                    top: 0,
                    bottom: 0,
                    selected: "3 ตัว",
                  });
                });
              }
            });
            setTimeout(function () {
              form.number = "";
            }, 100);
          }
        } else if (this.btnSelected == "19 ประตู") {
          if (form.number.length == 1) {
            let result = this.func19door(number);
            result.forEach((item) => {
              this.lottoNumberAll.push({
                number: item,
                top: 0,
                bottom: 0,
                selected: "2 ตัว",
              });
            });
            setTimeout(function () {
              form.number = "";
            }, 100);
            // this.formFast.number = "";
          }
        } else if (this.btnSelected == "เลขวิ่ง") {
          if (form.number.length == 1) {
            this.lottoNumberAll.push({
              number: form.number,
              top: 0,
              bottom: 0,
              selected: "1 ตัว",
            });
            setTimeout(function () {
              form.number = "";
            }, 100);
          }
          if (form.number.length > 1) {
            const arrNumber = form.number.split(/[, -/*~(_)]+/);
            arrNumber.forEach((item) => {
              if (item.length == 1) {
                this.lottoNumberAll.push({
                  number: item,
                  top: 0,
                  bottom: 0,
                  selected: "1 ตัว",
                });
              }
            });
            setTimeout(function () {
              form.number = "";
            }, 100);
          }
        }
      }
    },
    space6back(data) {
      const arr = [];
      this.lottoNumberAll.forEach((item) => {
        let result = this.func6back(item.number);
        result.forEach((el) => {
          arr.push({
            number: el,
            top: 0,
            bottom: 0,
            selected: "3 ตัว",
          });
        });
      });
      this.lottoNumberAll = arr;
      if (data.number.length == 1) {
        setTimeout(function () {
          data.number = "";
        }, 100);
      }
    },
    selectChoice() {
      if (this.form.select.length > 1) {
        this.form.select.splice(0, 1);
      }
    },
    selectedType(type) {
      this.btnSelected = type;
      this.formFast.number = "";
      this.lottoNumberAll = [];
    },
    clearDataLotto() {
      this.lottoNumberAll = [];
    },
    formatDate(date) {
      // moment.locale("th");
      return moment(date).format("DD-MM-YYYY");
    },
    filterDate(date) {
      // moment.locale("th");
      return moment(date).format("YYYY-MM-DD");
    },
    formatDateTime(date) {
      // moment.locale("th");
      return moment(date).format("DD-MM-YYYY HH:mm:ss");
    },
    showModalBill(bill) {
      this.$refs.modalBill.show();
      this.fetchPoyDetail(bill);
    },
    countDown(date, id) {
      if (date != null && id != null) {
        var dd = moment(new Date(date)).format("YYYY-MM-DD HH:mm:ss");
        this.polling = setInterval(() => {
          var countDownDate = new Date(dd).getTime();
          var now = new Date().getTime();
          var distance = countDownDate - now;
          // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          var t = document.getElementById(`demo${id}`);
          if (t != null) {
            document.getElementById(`demo${id}`).innerHTML =
              // `${days} วัน` +
              ("0" + hours).slice(-2) +
              ":" +
              ("0" + minutes).slice(-2) +
              ":" +
              ("0" + seconds).slice(-2);
            if (distance < 0) {
              // document.getElementById(`demo${id}`).innerHTML = "ปิดรับแทง";
              // this.close = false;
              // document
              //   .getElementById(`demo${id}`)
              //   .classList.remove("bg-warning");
              window.location.href = "/lotto";
              // this.$router
              //   .push({
              //     name: "lotto",
              //   })
              //
            }
          }
        }, 1000);
      }
    },
  },
  computed: {
    ...mapGetters(["User"]),
    getDataLottoType: function () {
      //   return this.rows.filter((el) => {
      //     return this.option.filter((item) => {
      //       return el.type === item.type;
      //     });
      //   });
      const lotto = [];
      const matches = this.option.map((item) => item.type);
      let program = [...new Set(matches)];
      // const dataNew = [];
      for (let i = 0; i < program.length; i++) {
        const item = program[i];
        const result = this.rows.filter((el) => el.type === item);
        lotto.push({ program: item, data: result });
      }
      return lotto;
    },
    get3topData: function () {
      return this.lottoNumberAll.filter((el) => {
        return el.selected === "3 ตัวบน";
      });
    },
    get3todData: function () {
      return this.lottoNumberAll.filter((el) => {
        return el.selected === "3 ตัวโต๊ด";
      });
    },
    get2topData: function () {
      return this.lottoNumberAll.filter((el) => {
        return el.selected === "2 ตัวบน";
      });
    },
    get2downData: function () {
      return this.lottoNumberAll.filter((el) => {
        return el.selected === "2 ตัวล่าง";
      });
    },
    getruntopData: function () {
      return this.lottoNumberAll.filter((el) => {
        return el.selected === "วิ่งบน";
      });
    },
    getrundownData: function () {
      return this.lottoNumberAll.filter((el) => {
        return el.selected === "วิ่งล่าง";
      });
    },
  },
};
</script>

<style>
table,
th,
td {
  /* border: 1px solid; */
  border-collapse: collapse;
}
/* .game-list-item {
  content: "";
  position: relative;
  top: 50%;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px 5px;
  font-size: 1.125rem;
  font-weight: 500;
  color: #f3f3f3;
  background: rgba(199, 0, 0, 0.8);
  transform: translateY(-50%);
} */

/* .filter-gray-huay {
  filter: grayscale(65%);
} */

.img-lotto {
  width: 100%;
  /* border-radius: 10px; */
}

.box-number {
  font-size: 19px;
  margin: 5px;
  width: 45px;
}

.box-lotto-number {
  border: solid 1px;
  border-radius: 3px;
  padding-bottom: 35px;
  max-width: 300px;
}

.fix-time {
  position: relative;
  top: -22%;
  width: 100% !important;
  z-index: 3;
  font-size: 27px;
  left: 30% !important;
  color: white;
}
</style>

<style lang="scss">
@import "@core/scss/vue/pages/dashboard-ecommerce.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
