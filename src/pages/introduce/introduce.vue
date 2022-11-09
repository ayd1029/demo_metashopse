<template>
  <q-page class="">

    <q-layout-header>
      <q-toolbar color="black" inverted>
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="35">
              <q-btn flat round dense icon="fast_rewind" @click="goHome" />
            </td>
            <td width="100">
              <img src="statics/images/logo/widelogo.png" @click="goHome" style="width: 100px;">
            </td>
            <td align="right">
              <font color="black" @click="goHome"><b>원더학개론</b></font>
            </td>
          </tr>
        </table>
      </q-toolbar>
    </q-layout-header>

    <!-- 타이틀 및 서론 -->
    <div align="center">
      <br>
      <div class="q-display-1 q-mb-md text-grey">제1장<br><br>탄생 배경</div>
      <p class="caption">
      </p>
      <br>
    </div>

    <!-- 채팅 -->
    <div :style="`width: ${chatDivWidth}; max-width: ${chatDivmaxWidth};`">
      <q-chat-message :label='today' />

      <q-chat-message
        label = ""
        :sent = false
        :text-color = textColorUser1
        :bg-color = bgColorUser1
        :name = nameUser1
        :avatar = avatarUser1
        :text = "['반갑네<br>재수강인 겐가?']"
      />

      <q-chat-message
        label = ""
        :sent = false
        :text-color = textColorUser1
        :bg-color = bgColorUser1
        :name = nameUser1
        :avatar = avatarUser1
        :text = "['여기까지 왔으면<br>일단 C학점은 딴걸세']"
      />

      <q-chat-message
        label = ""
        :sent = false
        :text-color = textColorUser1
        :bg-color = bgColorUser1
        :name = nameUser1
        :avatar = avatarUser1
        :text = "['축하하네<br>응?']"
      />

      <q-chat-message
        label = ""
        :sent = false
        :text-color = textColorUser1
        :bg-color = bgColorUser1
        :name = nameUser1
        :avatar = avatarUser1
        :text = "['누구긴 누군가<br>여기 You 말고 누가 있는가?']"
      />

      <q-chat-message
        label = ""
        :sent = true
        :text-color = textColorUser2
        :bg-color = bgColorUser2
        :name = nameUser2
        :avatar = avatarUser2
        :text = "['(뭐..뭐지 이건..)']"
      />

      <q-chat-message
        label = ""
        :sent = false
        :text-color = textColorUser1
        :bg-color = bgColorUser1
        :name = nameUser1
        :avatar = avatarUser1
        :text = "['오늘은 첫 수업이니까<br>책은 덮고 입만 털도록 하지']"
      />

      <q-chat-message
        label = ""
        :sent = false
        :text-color = textColorUser1
        :bg-color = bgColorUser1
        :name = nameUser1
        :avatar = avatarUser1
        :text = "['원더.<br>들어본 적은 있는가?']"
      />

      <q-chat-message
        label = ""
        :sent = false
        :text-color = textColorUser1
        :bg-color = bgColorUser1
        :name = nameUser1
        :avatar = avatarUser1
        :text = "['분명 있을 걸세<br>이걸 한번 보게나']"
      />

      <q-chat-message
        label = ""
        :sent = false
        :text-color = textColorUser1
        :bg-color = bgColorUser1
        :name = nameUser1
        :avatar = avatarUser1
      >
        <table>
          <tr>
            <td align="center">
              <img src="statics/images/introduce/wonderwoman.jpg" width="250">
            </td>
          </tr>
        </table>
      </q-chat-message>

      <q-chat-message
        label = ""
        :sent = false
        :text-color = textColorUser1
        :bg-color = bgColorUser1
        :name = nameUser1
        :avatar = avatarUser1
        :text = "['자네 선배일세<br>A+를 받았었다네','할일어디 없냐고 그러더니<br>할일우드 취업에 성공했지']"
      />

      <q-chat-message
        label = ""
        :sent = false
        :text-color = textColorUser1
        :bg-color = bgColorUser1
        :name = nameUser1
        :avatar = avatarUser1
        :text = "['원더가 뭔지 알기 위해서는<br>탄생 배경을 알아야 한다네']"
      />

      <q-chat-message
        label = ""
        :sent = false
        :text-color = textColorUser1
        :bg-color = bgColorUser1
        :name = nameUser1
        :avatar = avatarUser1
        :text = "['먼저 몇 가지 물어보도록 하지<br>자네 요즘 지내는 건 어떠한가?']"
      />

      <q-chat-message
        label = ""
        :sent = true
        :text-color = textColorUser2
        :bg-color = bgColorUser2
        :name = nameUser2
        :avatar = avatarUser2
      >
        <table width="50%" align="center">
          <tr>
            <td align="center">
              <q-btn label="① 매우 만족스럽다" @click="setAnswer(1, 1)" color="primary" :style="`width:${answerBtnWidth}px`" rounded push />
            </td>
          </tr>
          <tr>
            <td align="center">
              <q-btn label="② 그냥 그저그렇다" @click="setAnswer(1, 2)" color="primary" :style="`width:${answerBtnWidth}px`" rounded push />
            </td>
          </tr>
          <tr>
            <td align="center">
              <q-btn label="③ 언제나 우울하다" @click="setAnswer(1, 3)" color="primary" :style="`width:${answerBtnWidth}px`" rounded push />
            </td>
          </tr>
        </table>
      </q-chat-message>

        <q-chat-message
          v-if="answer1 === 1"
          label = ""
          :sent = false
          :text-color = textColorUser1
          :bg-color = bgColorUser1
          :name = nameUser1
          :avatar = avatarUser1
          :text = "['왜냐하면 아무 생각이<br>없기 때문일세']"
        />

        <q-chat-message
          v-if="answer1 === 2"
          label = ""
          :sent = false
          :text-color = textColorUser1
          :bg-color = bgColorUser1
          :name = nameUser1
          :avatar = avatarUser1
          :text = "['자네가 그저 그런<br>사람이기 때문일세']"
        />

      <!-- 1번 질문 답이 3인 경우에 표시 -->
      <div v-if="answer1 === 3">

        <q-chat-message
          label = ""
          :sent = false
          :text-color = textColorUser1
          :bg-color = bgColorUser1
          :name = nameUser1
          :avatar = avatarUser1
          :text = "['거울을 멀리 해보게나<br>한결 나아질걸세']"
        />

        <q-chat-message
          label = ""
          :sent = false
          :text-color = textColorUser1
          :bg-color = bgColorUser1
          :name = nameUser1
          :avatar = avatarUser1
          :text = "['그럼 자네는 다음중<br>어떤 부류에 속하는 겐가?']"
        />

        <q-chat-message
          label = ""
          :sent = true
          :text-color = textColorUser2
          :bg-color = bgColorUser2
          :name = nameUser2
          :avatar = avatarUser2
        >
          <table width="50%" align="center">
            <tr>
              <td align="center">
                <q-btn label="① 잘나가는 유튜버" color="primary" @click="setAnswer(2, 1)" :style="`width:${answerBtnWidth}px`" rounded push />
              </td>
            </tr>
            <tr>
              <td align="center">
                <q-btn label="② 불꽃 파워블로거" color="primary" @click="setAnswer(2, 2)" :style="`width:${answerBtnWidth}px`" rounded push />
              </td>
            </tr>
            <tr>
              <td align="center">
                <q-btn label="③ 기타 인플루언서" color="primary" @click="setAnswer(2, 3)" :style="`width:${answerBtnWidth}px`" rounded push />
              </td>
            </tr>
            <tr>
              <td align="center">
                <q-btn label="④ 해당사항이 없음" color="primary" @click="setAnswer(2, 4)" :style="`width:${answerBtnWidth}px`" rounded push />
              </td>
            </tr>
          </table>
        </q-chat-message>

        <q-chat-message
          v-if="answer2 === 1"
          label = ""
          :sent = false
          :text-color = textColorUser1
          :bg-color = bgColorUser1
          :name = nameUser1
          :avatar = avatarUser1
          :text = "['잘나가는 유튜버라<br>허허']"
        />

        <q-chat-message
          v-if="answer2 === 2"
          label = ""
          :sent = false
          :text-color = textColorUser1
          :bg-color = bgColorUser1
          :name = nameUser1
          :avatar = avatarUser1
          :text = "['불꽃 파워블로거라<br>허허']"
        />

        <q-chat-message
          v-if="answer2 === 3"
          label = ""
          :sent = false
          :text-color = textColorUser1
          :bg-color = bgColorUser1
          :name = nameUser1
          :avatar = avatarUser1
          :text = "['인플루엔자와 헷갈린건 아닌 겐가<br>허허']"
        />

        <q-chat-message
          v-if="answer2 === 1 || answer2 === 2 || answer2 === 3"
          label = ""
          :sent = false
          :text-color = textColorUser1
          :bg-color = bgColorUser1
          :name = nameUser1
          :avatar = avatarUser1
          :text = "['축하하네 부럽군','자네는 그냥<br>지금처럼 살면 된다네','오늘 강의는 여기까지<br>그럼 또 봅세.']"
        />

        <!-- 2번 질문 답이 4인 경우에 표시 -->
        <div v-if="answer2 === 4">

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['내말이 바로 그 말일세<br>응?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['다들 방송이다 광고다 뭐다 해서<br>크고 작은 수익이 있는데','인터넷에 많은 시간을 소비하는<br>우리들은 도대체 왜!<br>아무것도 없냔 말일세']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['인스타 보면서 이야아하고<br>페북 보면서 헤헤거리고<br>유튜브 보면서 낄낄거리다','폰 놓고 잠들 때<br>어떤 생각이 들던가?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser2
            :bg-color = bgColorUser2
            :name = nameUser2
            :avatar = avatarUser2
          >
            <table width="50%" align="center">
              <tr>
                <td align="center">
                  <q-btn label="① 너무 즐거웠다" color="primary" @click="setAnswer(3, 1)" :style="`width:${answerBtnWidth}px`" rounded push />
                </td>
              </tr>
              <tr>
                <td align="center">
                  <q-btn label="② 정말 보람찼다" color="primary" @click="setAnswer(3, 2)" :style="`width:${answerBtnWidth}px`" rounded push />
                </td>
              </tr>
              <tr>
                <td align="center">
                  <q-btn label="③ 이게 사는참맛" color="primary" @click="setAnswer(3, 3)" :style="`width:${answerBtnWidth}px`" rounded push />
                </td>
              </tr>
              <tr>
                <td align="center">
                  <q-btn label="④ 뭔가 허무했다" color="primary" @click="setAnswer(3, 4)" :style="`width:${answerBtnWidth}px`" rounded push />
                </td>
              </tr>
            </table>
          </q-chat-message>

          <q-chat-message
            v-if="answer3 === 1"
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['그렇게 즐겁던가?<br>허허']"
          />

          <q-chat-message
            v-if="answer3 === 2"
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['그렇게 보람차던가?<br>허허']"
          />

          <q-chat-message
            v-if="answer3 === 3"
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['거울을 한번 보게나<br>허허']"
          />

          <q-chat-message
            v-if="answer3 === 1 || answer3 === 2 || answer3 === 3"
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['축하하네 부럽군','자네는 그냥<br>지금처럼 살면 된다네','오늘 강의는 여기까지<br>그럼 또 봅세.']"
          />

          <!-- 3번 질문 답이 4인 경우에 표시 -->
          <div v-if="answer3 === 4">

            <q-chat-message
              label = ""
              :sent = false
              :text-color = textColorUser1
              :bg-color = bgColorUser1
              :name = nameUser1
              :avatar = avatarUser1
              :text = "['내말이 바로 그 말일세<br>응?']"
            />

            <q-chat-message
              label = ""
              :sent = false
              :text-color = textColorUser1
              :bg-color = bgColorUser1
              :name = nameUser1
              :avatar = avatarUser1
              :text = "['그럼 앞으로 어쩔 셈인가?<br>방송이라도 해볼 텐가?<br>자네는 뭘 가지고 있는 겐가?']"
            />

            <q-chat-message
              label = ""
              :sent = true
              :text-color = textColorUser2
              :bg-color = bgColorUser2
              :name = nameUser2
              :avatar = avatarUser2
            >
              <table width="50%" align="center">
                <tr>
                  <td align="center">
                    <q-btn label="① 몸매가 끝장난다" color="primary" @click="setAnswer(4, 1)" :style="`width:${answerBtnWidth}px`" rounded push />
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <q-btn label="② 말빨이 끝장난다" color="primary" @click="setAnswer(4, 2)" :style="`width:${answerBtnWidth}px`" rounded push />
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <q-btn label="③ 얼굴이 끝장난다" color="primary" @click="setAnswer(4, 3)" :style="`width:${answerBtnWidth}px`" rounded push />
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <q-btn label="④ 얼굴이 끝났다..." color="primary" @click="setAnswer(4, 4)" :style="`width:${answerBtnWidth}px`" rounded push />
                  </td>
                </tr>
              </table>
            </q-chat-message>

            <q-chat-message
              v-if="answer4 === 1"
              label = ""
              :sent = false
              :text-color = textColorUser1
              :bg-color = bgColorUser1
              :name = nameUser1
              :avatar = avatarUser1
              :text = "['그게 정말인가?<br>허허']"
            />

            <q-chat-message
              v-if="answer4 === 2"
              label = ""
              :sent = false
              :text-color = textColorUser1
              :bg-color = bgColorUser1
              :name = nameUser1
              :avatar = avatarUser1
              :text = "['재능이 있는 친구일세<br>허허']"
            />

            <q-chat-message
              v-if="answer4 === 3"
              label = ""
              :sent = false
              :text-color = textColorUser1
              :bg-color = bgColorUser1
              :name = nameUser1
              :avatar = avatarUser1
              :text = "['어디서 거짓말을..<br>뭐 암튼 그렇다고 하니']"
            />

            <q-chat-message
              v-if="answer4 === 1 || answer4 === 2 || answer4 === 3"
              label = ""
              :sent = false
              :text-color = textColorUser1
              :bg-color = bgColorUser1
              :name = nameUser1
              :avatar = avatarUser1
              :text = "['축하하네 부럽군','자네는 그냥<br>지금처럼 살면 된다네','오늘 강의는 여기까지<br>그럼 또 봅세.']"
            />

            <!-- 4번 질문 답이 4인 경우에 표시 -->
            <div v-if="answer4 === 4">

              <q-chat-message
                label = ""
                :sent = false
                :text-color = textColorUser1
                :bg-color = bgColorUser1
                :name = nameUser1
                :avatar = avatarUser1
                :text = "['솔직해진 겐가<br>힘내시게 파이팅..']"
              />

              <q-chat-message
                label = ""
                :sent = false
                :text-color = textColorUser1
                :bg-color = bgColorUser1
                :name = nameUser1
                :avatar = avatarUser1
                :text = "['바로 그러한 이유로<br>\'원더\'가 탄생했다네']"
              />

              <q-chat-message
                label = ""
                :sent = false
                :text-color = textColorUser1
                :bg-color = bgColorUser1
                :name = nameUser1
                :avatar = avatarUser1
                :text = "['크리에이터가 되지 않아도<br>수익을 창출할 수 있는<br>그런 플랫폼이 필요했던 것.']"
              />

              <q-chat-message
                label = ""
                :sent = false
                :text-color = textColorUser1
                :bg-color = bgColorUser1
                :name = nameUser1
                :avatar = avatarUser1
                :text = "['자 그럼 이제<br>본론으로 들어가지.']"
              />

              <q-chat-message
                label = ""
                :sent = false
                :text-color = textColorUser1
                :bg-color = bgColorUser1
                :name = nameUser1
                :avatar = avatarUser1
                :text = "['원더라는 것은 응?<br>벌써 점심시간인 겐가?']"
              />

              <q-chat-message
                label = ""
                :sent = false
                :text-color = textColorUser1
                :bg-color = bgColorUser1
                :name = nameUser1
                :avatar = avatarUser1
                :text = "['오늘 강의는 여기까지.<br>수고 많았네.']"
              />

              <q-chat-message
                label = ""
                :sent = false
                :text-color = textColorUser1
                :bg-color = bgColorUser1
                :name = nameUser1
                :avatar = avatarUser1
                :text = "['참, 다음 강의 자료는<br>자료실에 올려놨다네.','예습을 하고 오게나<br>허허']"
              />

              <!-- 사이트 링크, 앱스토어 링크 -->
              <div v-if="$store.state.userVo == null || $store.state.userVo.uid == null || $store.state.userVo.uid === ''" style="width: 100%;">
                <br>
                <br>
                <br>
                <table align="center" border="0" width="85%">
                  <tr>
                    <td align="center">
                      <q-btn @click="doLoginKakaoStart" size="md" color="kakao" style="width:181px; height:56px;">
                        <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="30" align="left"><img src="statics/images/logo/kakao_logo.png" style="width:30px; vertical-align:middle;"></td>
                            <td align="center"><font size="3" color="#3c1e1e">뭔소린지 보기</font></td>
                          </tr>
                        </table>
                      </q-btn>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td align="center">
                      <a @click="getApp('android')"><img src="statics/images/btn/bt_googleplay.png"></a>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td align="center">
                      <a @click="getApp('ios')"><img src="statics/images/btn/bt_appstore.png"></a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">&nbsp;</td>
                  </tr>
                </table>
              </div>

            </div><!-- 4번 질문 답이 4인 경우에 표시 -->
          </div><!-- 3번 질문 답이 4인 경우에 표시 -->
        </div><!-- 2번 질문 답이 4인 경우에 표시 -->
      </div><!-- 1번 질문 답이 3인 경우에 표시 -->

      <!-- 제2장, 제3장 로그인 된 사용자만 표시 -->
      <div v-if="$store.state.userVo != null && $store.state.userVo.uid != null && $store.state.userVo.uid !== ''">

        <!-- ■■■■■■■ 제2장 시작 ■■■■■■■ -->
        <div align="center">
          <br>
          <br>
          <br>
          <br>
          <br>
          <q-card-separator />
          <br>
          <br>
          <br>
          <br>
          <div class="q-display-1 q-mb-md text-grey">제2장<br><br>작은 이들을 위한 #</div>
          <p class="caption">
          </p>
          <br>
          <br>
        </div>

        <!-- 채팅 -->
        <div :style="`width: ${chatDivWidth}; max-width: ${chatDivmaxWidth};`">

          <br>
          <div align="center">
            <font size="4" color="grey">
              <br>
              스토리 A
              <br><br>
              일반인 계보람씨
              <br><br><br><br>
            </font>
          </div>

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['크리에이터들은 유튜브로 돈벌고<br>인플루언서는 블로그 인스타로 돈버는데']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['난 방송도 못하겠고<br>파워블로거랑도 거리가 멀어']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['월급쟁이 생활만 해도 충분히 벅차거든..']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['매일매일 인스타, 페이스북, 유튜브<br>남들 스토리 열심히 구경하고']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['가끔 맛집 인증샷도 올려는 보지만']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['왜이리 허전한걸까..']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade1
            :text = "['소중한 내 시간들 안녀엉..']"
          />

          <q-chat-message
            label = "🔥원더원더🔥"
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['응? 이건 뭐지? 메타샵스?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['판매할 상품도 없는데<br>내 샵을 만들 수 있다고?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['무슨 말인지 잘 모르겠는데..']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['돈드는 것도 아닌데 어디한번 해볼까?']"
          />

          <q-chat-message
            label = "무작정 따라하기"
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['음 판매자의 상품을<br>내 상품으로 등록하고..']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['어라? 클릭 한번이면 끝이네?<br>그럼 몇개 더 담아 보자']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['나는 볼링에 관심이 있으니<br>볼링 관련 용품 위주로 담아 놓고']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['좋아! 내 샵이 오분만에 완성됐네?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade4
            :text = "['나름 샵이 생겼으니<br>SNS에 링크해놔야지~']"
          />

          <q-chat-message
            label = "얼마 후"
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['띠리링~']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['뭐지뭐지? 어라?<br>누가 내가 담아놓은 상품을 구매했네?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade4
            :text = "['오오! 판매자로부터 보상금이 들어왔어!<br>아~ 이런거구나~']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade4
            :text = "['내가 판매자의 상품을<br>내 주위 사람들에게 노출시켜서']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade4
            :text = "['자연스럽게 광고가 되고<br>구매 발생시 광고보상금을 받는거네~']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade4
            :text = "['난 판매할 상품을 사들이지도 않고<br>상품 배송을 하는 것도 아닌데']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade4
            :text = "['그냥 클릭 몇번에 돈벌었네?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade5
            :text = "['이제서야 시간이 아깝지 않은걸 찾았군!<br>그럼 상품을 더 담아볼까나~']"
          />

          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <div align="center">
            <font size="4" color="grey">
              <br>
              스토리 B
              <br><br>
              판매자 계고민씨
              <br><br><br><br>
            </font>
          </div>

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['죽겠네..']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['매출은 점점 떨어지고..<br>인건비는 점점 오르고..']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['다시 취업 ㄱㄱ?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['어휴 이거<br>재고 쌓인 것 좀 봐']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['어디 광고라도 해야<br>주문이 들어올텐데..']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['잘되는 곳들은<br>광고비에 더 투자하니<br>계속 더 잘되는데']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['이건 뭐 매출이 줄어드니<br>광고비도 줄어들고<br>계속 내리막이구만..']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['이건 뭐 매출이 줄어드니<br>광고비도 줄어들고<br>계속 내리막이구만..']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade2
            :text = "['또 무리하게 광고비에 투자해서<br>반드시 잘된다는 보장도 없으니 원..']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade1
            :text = "['가격 경쟁까지 심각하니<br>이거 뭐 장사 하겠나..']"
          />

          <q-chat-message
            label = "🔥원더원더🔥"
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['응? 이건 뭐지? 메타샵스?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['상품만 올려놓으면<br>사용자들이 알아서<br>광고를 해준다고?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['무슨 말인지 잘 모르겠는데..']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['돈드는 것도 아닌데<br>어디한번 해볼까?']"
          />

          <q-chat-message
            label = "무작정 따라하기"
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['뭐 복잡하게 심사받고<br>그런게 없네?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['그럼 일단 시범삼아<br>상품을 하나 올려보자~']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['광고보상금?<br>이건 뭐지?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['내 상품을 광고해주면<br>주는 보상이구나']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['뭐 어차피 팔려야만<br>나가는 비용이니까 뭐.']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['어떻게 될지도 모르고<br>무작정 쓰는 광고비보단<br>훨씬 합리적이군']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['게다가 판매자가<br>마음대로 정할 수 있네?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade4
            :text = "['좋아,<br>상품등록 완료~']"
          />

          <q-chat-message
            label = "부욱~부욱~"
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['어라?<br>벌써 사람들이 자기 홈피에<br>상품을 담아 가네?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
            :text = "['누가 담아가면 그 지인들이<br>다시 담아가는구나!<br>파급력이 엄청난데 이거?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade3
          >
            응? 올려 놓은 상품이<br>
            <font color="green"><b>네이버</b></font>에서 검색도 되네?
          </q-chat-message>

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade4
            :text = "['이거 뭐<br>따로 광고비를 안써도<br>상품만 계속 올려주면']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser1
            :bg-color = bgColorUsers
            :avatar = avatarGrade5
            :text = "['되겠는데? ㅋㅋㅋ']"
          />

        </div>
        <!-- ■■■■■■■ 제2장 종료 ■■■■■■■ -->

        <!-- ■■■■■■■ 제3장 시작 ■■■■■■■ -->
        <div align="center">
          <br>
          <br>
          <br>
          <br>
          <br>
          <q-card-separator />
          <br>
          <br>
          <br>
          <br>
          <div class="q-display-1 q-mb-md text-grey">제3장<br><br>그래서 원더란?</div>
          <p class="caption">
          </p>
          <br>
          <br>
        </div>

        <div :style="`width: ${chatDivWidth}; max-width: ${chatDivmaxWidth};`">
          <q-chat-message label='원더로이드 친구 양초가 찾아왔다.' />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['이봐 깡통, 원더가 뭐야?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['머긴 머야<br>너처럼 궁금해하는 거지 ㅋ']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['아니, 진짜 그런 뜻이야?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['나도 잘 몰라 그냥 개발자가 처음에<br>discoin.shop으로 만들었다가','이름이 너무 길다면서<br>metashopse.com으로 줄이더라고..']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['음 그런 거였군. 그래 내일 봐~']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['게 섯거라아~','검색결과 약 25,100,000개<br>(0.34초)']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['응? 구글링한거?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['1the라 적고 원더라 읽는다.','원더란?','메타샵스에서 사용하는<br>사용자의 활동에 대한<br>보상의 일종이며','1원더는<br>한화 1원의 가치를 가진다.<br>현금으로 1:1 환급된다는 뜻.','백원더는 백원,<br>천원더는 천원인 것이다.']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['뭐야 뜬금없이..','백원을 더 달라는 거야<br>천원을 더 달라는 거야?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['원더를 획득하는 방법은<br>다음과 같다.','① 상품 상세화면에서<br>\'<b>내 홈에 등록하기</b>\'로<br>자신의 광고 상품으로 등록한다.']"
          >
          </q-chat-message>

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
          >
            <img src="statics/images/introduce/myproduct_add.jpg" width="250px">
          </q-chat-message>

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['그러면 해당 상품은<br>자신의 홈에 표시된다.']"
          >
          </q-chat-message>

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
          >
            <img src="statics/images/introduce/myproduct_added.jpg" width="250px">
          </q-chat-message>

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['② 사용자들이 \'①\'에서 등록한<br>상품을 조회하게 되고','만약 사용자가 그 상품을<br>처음으로 접하게 된 것이라면','광고 상품 등록자가<br>광고에 성공한 것이므로','구매 발생 시<br>판매자가 설정한<br>보상금을 얻게 된다.','이 보상금을 원더라고 한다.']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['기..길다..짧게점..']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['판매자의 상품을<br>사용자들에게 알려서<br>구매가 발생하면<br>보상으로 받는 광고비?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['더 짧게']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['광고보상금?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['더']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['돈?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['그게 다야?<br>그럼 광고자만 좋은 거네?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['판매자의 입장에서는 오히려<br>광고비를 절감할 수 있지.','기존의 광고 방식은<br>구매 발생과 무관하게<br>광고비만 쭉쭉 나가고..']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['그런데 여기는<br>일단 판매가 되어야<br>광고비가 나가니까.','게다가 광고보상금은<br>판매자가 직접 설정하니까<br>좀 더 합리적이지.']"
          />
    <!--
          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['그리고 판매수수료도<br>모든 상품이<br>5%로 동일하니까.','결제대행사 수수료 3%를 포함한 5%니까<br>판매금액 10,000원에 500원 정도?']"
          />
    -->
          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['무엇보다도']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['제발 짧게점..']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['광고 효율이 응? 뭐라고?<br>광고 효율이 좋을 거란 말이지','친구들에게 전달되는 방식이라서','연령대, 관심사, 경제력 등이<br>비슷한 사람들에게 적절한 상품이<br>표시되고 이것은 곧','구매율이 높아질 수 있다는 말씀.']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['그냥 네 생각 아니냐ㅋ']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['그리고 메타샵스엔<br>거기에 없는 것들이 있지 후후']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['후후?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['다양한 콘텐츠가 있잖아?','특히 \'음악\'이 있다는 것.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['오프라인 쇼핑몰은<br>항상 음악이 흐르는데','왜 온라인 쇼핑몰은<br>하나같이 조용한 거야?<br>도서관이야?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['그래서 메타샵스은<br>YouTube를 갖다 놨지 훗']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['저작권은?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['중요하지 저작권.','여기 모든 동영상은<br>YouTube 플레이어를 사용해.','YouTube에서 공식적으로<br>제공하는 API를 이용하는 것.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['뭔지 잘 모르겠다면 그냥','YouTube에서<br>\'이걸 써서 퍼가라\' 하고<br>만들어 놓은 것을 쓰고 있다고<br>생각하면 되는 거.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['요것']"
          >
            <img src="statics/images/introduce/youtube_right1.jpg" width="250px">
          </q-chat-message>

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['YouTube와는 그렇다고 쳐도<br>동영상을 올린 크리에이터들은?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['YouTube 자체가 원래<br>동영상 공유 플랫폼이라서','동영상을 올리는 것은 곧<br>공유를 허가한다는 의미.','공유를 원하지 않을 경우<br>\'퍼가기 허용하지 않음\'으로<br>설정할 수 있으니.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['요것']"
          >
            <img src="statics/images/introduce/youtube_right2.jpg" width="250px">
          </q-chat-message>

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['그럼 콘텐츠가 있는 쇼핑.<br>이거?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['초반에 얘기한 원더 있잖아 원더.']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['어 그 무슨 보상금.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['그래 그 광고 보상금 원더.<br>그걸 바로 출금할 수도 있지만']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['그냥 보유하고 있으면','돈을 준대요!']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['어떻게? 그리고 왜?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['음 일단 \'어떻게?\'<br>쉬운 이해를 위해 예를 들어보자.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['1. 판매자가 판매가 10만원,<br>보상금 1,000원더인<br>신발을 등록했다.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['2. 깡통은 그 신발을<br>광고 상품으로 등록하여','자신의 홈에<br>해당 상품이 노출되었다.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['3. 깡통의 홈에서<br>콘텐츠를 구경하던 양초는<br>그 신발을 보고 구매했다.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['4. 이후 1년간 아무런 구매도<br>발생하지 않았다고 설정한다.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['자냐?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['잠시 눈감고 생각한거야.<br>불 아직 켜져 있잖아.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['깡통은 1,000원더를 획득했다.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['메타샵스은 10만원의 5%에서<br>결제대행 수수료 3%를 뺀<br>2%의 수익이 발생했다.<br>10만원의 2%는 2,000원이다.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['이래저래 운영비를 빼고 1%<br>즉 1,000원이 2019년의<br>순수익이라고 가정하자.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['이 순수익 1,000원의 10%인<br>100원을<br>원더 보유자들에게 나누어 준다.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['지금은 원더 보유자가<br>깡통 단 1명이다.','그럼 깡통이 100원을<br>모두 받게 된다.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['1,000원더 보유에<br>100원을 받았으니<br>수익률이 10%가 된다.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['자냐?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['이거 침 아니야 땀이야.<br>근데 왜 나눠주는거?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['이미 좋은 쇼핑몰은 많다.','최저가, 새벽배송, 정기구매 등등<br>정말 편리한 플랫폼들이<br>수없이 많다.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['하지만 그 모든 공룡들은 말한다.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['어서오세요 \'구매자\'님']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['반갑습니다 \'구매자\'님']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['이것도 사실래요? \'구매자\'님']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['조금만 더 쓰시면<br>할인쿠폰 드릴게요']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['\'구\' \'매\' \'자\' 님!']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['크게 외쳐라.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['정녕 내가 받을 수 있는건!','할인쿠폰 밖에 없나욧!!!']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['괘..괜찮은거지?<br>임시정부수립 100주년?']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['자아 이제 판매자도 보상을 주고<br>플랫폼 사업자도 수익을 나눠주는','새로운 플랫폼을 만들어보자.']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['모두 같이 만들어 보자!','다 같이 먹고살자!','나도 한입만 나도나도~응?','오케이 여기까지 헐 벌써 시간이..']"
          />

          <q-chat-message
            label = ""
            :sent = false
            :text-color = textColorUser1
            :bg-color = bgColorUser1
            :name = nameUser1
            :avatar = avatarUser1
            :text = "['퇴근 준비해야 돼 내일 보자.']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['지금 4시인데 무슨 퇴근 준비야?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['저기요?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['미스터 깡?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['깡사마?']"
          />

          <q-chat-message
            label = ""
            :sent = true
            :text-color = textColorUser4
            :bg-color = bgColorUser4
            :name = nameUser4
            :avatar = avatarUser4
            :text = "['갔네..']"
          />

        </div>

        <!-- ■■■■■■■ 제3장 종료 ■■■■■■■ -->

      </div><!-- 제2장, 제3장 로그인 된 사용자만 표시 -->

      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </div>

    <br>&nbsp;

  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'

export default {
  name: 'intro',
  data () {
    return {
      today: '', // 현재 날짜
      answerBtnWidth: 170, // 답변 버튼 너비
      chatDivWidth: '100%',
      chatDivmaxWidth: '100vw',

      nameUser1: '원더로이드',
      bgColorUser1: 'green-1',
      textColorUser1: 'black',
      avatarUser1: 'statics/images/introduce/logo_android.jpg',

      nameUser2: 'You',
      bgColorUser2: 'grey-3',
      textColorUser2: 'black',
      avatarUser2: 'statics/images/introduce/baseline_mood_bad_black_48dp.png',

      nameUsers: '계보람',
      nameSeller: '계재고',
      bgColorUsers: 'white',
      bgColorSeller: 'pink-1',
      avatarGrade1: 'statics/images/introduce/baseline_mood_bad_black_48dp.png',
      avatarGrade2: 'statics/images/introduce/baseline_sentiment_very_dissatisfied_black_48dp.png',
      avatarGrade3: 'statics/images/introduce/baseline_sentiment_dissatisfied_black_48dp.png',
      avatarGrade4: 'statics/images/introduce/baseline_sentiment_satisfied_black_48dp.png',
      avatarGrade5: 'statics/images/introduce/baseline_sentiment_very_satisfied_black_48dp.png',

      nameUser3: '원더로이드',
      bgColorUser3: 'green-1',
      textColorUser3: 'black',
      avatarUser3: 'statics/images/introduce/logo_android.jpg',

      nameUser4: '양초',
      bgColorUser4: 'grey-3',
      textColorUser4: 'black',
      avatarUser4: 'statics/images/introduce/logo_apple.jpg',

      answer1: 0, // 1번 질문 답변
      answer2: 0,
      answer3: 0,
      answer4: 0
    }
  },
  components: {
  },
  created: function () {
    // 현재 날짜 설정
    this.today = this.getToday()

    // 콜백 스크립트 로드
    this.$loadScript('statics/js/callback.js')
      .then(() => {
        // Script is loaded, do something
        window.vm = this // callback.js 의 vm 변수에 this 를 설정, 콜백에서 사용
      })
      .catch(() => {
        // Failed to fetch script
        console.log('callback.js loadScript failed.')
      })
  },
  methods: {
    // 답변 설정
    setAnswer (questionNum, answer) {
      if (questionNum === 1) {
        this.answeredQ1 = true
        this.answer1 = answer
      } else if (questionNum === 2) {
        this.answeredQ2 = true
        this.answer2 = answer
      } else if (questionNum === 3) {
        this.answeredQ3 = true
        this.answer3 = answer
      } else if (questionNum === 4) {
        this.answeredQ4 = true
        this.answer4 = answer
      }
    },
    getToday () {
      // TODAY 설정
      let today = new Date()
      today.setDate(today.getDate()) // 익일까지 입금
      let yyyy = today.getFullYear()
      let dd = today.getDate()
      let mm = today.getMonth() + 1
      /*
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      */
      return yyyy + '년 ' + mm + '월 ' + dd + '일'
    },
    goHome () {
      if (Vue.prototype.$checkLogin(this.$store.state.userVo)) { // 로그인 되어 있는 경우
        this.goBack() // 뒤로가기
      } else { // 로그인 되어 있지 않은 경우
        if (this.$store.state.device === 'P') {
          this.$router.push('/welcome')
        } else {
          this.$router.push('/')
        }
      }
    },
    goBack () {
      try {
        // 라우터 백 패스 설정
        let path = this.$store.state.ROUTER_FROM_PATH[this.$store.state.ROUTER_FROM_PATH.length - 1]
        // 라우터 백 패스 1개 삭제
        this.$store.state.ROUTER_FROM_PATH.splice(this.$store.state.ROUTER_FROM_PATH.length - 1, 1)
        // 뒤로가기 여부 - true일 경우 라우터 패스를 저장 안함, goBack() 함수 내에서 true로 설정, 라우터에서 false로 초기화
        this.$store.state.ROUTER_IS_MOVE_BACK = true
        // 라우터 백 패스로 이동
        this.$router.push(path)
      } catch (e) {
        if (this.$store.state.device === 'P') {
          this.$router.push('/welcome')
        } else {
          this.$router.push('/')
        }
      }
    },
    getApp (os) {
      if (os === 'android') {
        window.open('https://play.google.com/store/apps/details?id=kr.oneon.sellerz')
      } else {
        window.open('https://itunes.apple.com/us/app/%EC%9B%90%EB%8D%94%EC%83%B5/id1462604983?l=ko&ls=1&mt=8')
      }
    },
    // 1. 카카오 로그인
    doLoginKakaoStart () {
      // APP일 경우 화면전환 방식으로 처리
      if (this.$store.state.device === 'android' || this.$store.state.device === 'ios') {
        this.doLoginKakaoRest()
        return
      }
      // 로그인 창을 띄웁니다.
      this.$store.state.Kakao.Auth.login({
        success: function (authObj) {
          // alert(JSON.stringify(authObj))
          // doLoginKakaoStart() -> callback.js의 doLoginKakaoJs() -> 여기 뷰의 doLoginKakao() 순서로 실행됨
          window.doLoginKakaoJs(authObj)
        },
        fail: function (err) {
          console.log(JSON.stringify(err))
        }
      })
    },
    // 2. 카카오 토큰으로 회원가입 or 로그인
    doLoginKakao (authObj) {
      this.$axios.post(this.$store.state.apiServerIp + '/api/login/doLoginKakao', authObj)
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          if (result.data.resultCd !== 'SUCCESS') { // 카카오 로그인 실패시
            this.$q.notify({
              color: 'primary',
              position: 'top',
              message: result.data.resultMsg,
              icon: 'notifications_active'
            })
          } else {
            // 로그인 처리
            this.doLogin(result.data)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 3. 로그인
    doLogin (userVo) {
      // 쿠키에 사용자 정보 저장
      this.$cookie.set('uid', userVo.uid, 365)
      this.$cookie.set('auth_key', userVo.auth_key, 365)

      this.$store.state.userVo = userVo // 사용자 정보 설정
      this.$store.state.userVo.auth_key = userVo.auth_key // 인증키 설정

      // 부모창의 콜백함수 호출
      this.$emit('callback-login', this.$store.state.userVo.uid)

      // 사용자 코인 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/coin/selectCoinRanking',
        {params: {uid: this.$store.state.userVo.uid}})
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 코인 정보 설정
          this.$store.state.coinVo = result.data
        })
        .catch((err) => {
          console.log('★★3 ' + err)
        })
      // 판매자 정보 조회
      this.$axios.get(this.$store.state.apiServerIp + '/api/seller/selectSeller')
        .then((result) => {
          // console.log(JSON.stringify(result.data))
          // 판매자 정보 설정
          // 상품 등록시 계좌정보가 없으면 등록필요 알림
          this.$store.state.sellerVo = result.data
        })
        .catch((err) => {
          console.log('★★4 ' + err)
        })

      this.$router.push('/menu/introduce')

      // 환영 메세지
      this.$q.notify({
        color: 'green',
        position: 'top',
        message: '잘 왔네 허허',
        icon: 'accessibility_new'
      })
    },
    doLoginKakaoRest () {
      let kakaoHostUrl = this.$store.state.KAKAO_HOST + '/oauth/authorize'
      kakaoHostUrl += '?client_id=' + this.$store.state.KAKAO_API_REST_KEY
      kakaoHostUrl += '&redirect_uri=' + this.$store.state.KAKAO_REDIRECT_URI
      kakaoHostUrl += '&response_type=code'

      // 쿠키에 사용자 정보 저장
      this.$cookie.set('autoLoginCheck', this.autoLoginCheck, 365)
      this.$cookie.set('autoLoginRun', this.autoLoginCheck, 365)

      location.href = kakaoHostUrl
    }
  }
}
</script>
