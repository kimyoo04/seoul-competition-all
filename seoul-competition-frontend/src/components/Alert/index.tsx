import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { alertActions } from "@features/alert/alertSlice";
import Overlay from "./Overlay";
import AlertPortal from "@components/Alert/AlertPortal";
import classNames from "classnames";

//--------------------------------------------------------------------------------
// isAlert - 알림 활성 / 알림 비활성
// alertType - 알림의 종류, 제목, 아이콘, 색깔을 설정
// content - 알림의 내용을 설정
//--------------------------------------------------------------------------------

export const AlertComponent = () => {
  const dispatch = useAppDispatch();
  const { isAlert, alertType, content } = useAppSelector(
    (state) => state.alert
  );
  const [alertIcon, setAlertIcon] = useState(<div></div>);

  const alertShadowColor = classNames(
    { "shadow-alert_success": alertType == "Success" },
    { "shadow-alert_warning": alertType == "Warning" },
    { "shadow-alert_danger": alertType == "Danger" },
    { "shadow-alert_info": alertType == "Infomation" },
    { "": alertType == "" }
  );

  const alertTextColor = classNames(
    { "text-alert_success": alertType == "Success" },
    { "text-alert_warning": alertType == "Warning" },
    { "text-alert_danger": alertType == "Danger" },
    { "text-alert_info": alertType == "Infomation" },
    { "": alertType == "" }
  );

  // message.alertType 별 분기 처리 및 컴포넌트 할당
  useEffect(() => {
    switch (alertType) {
      case "Success":
        setAlertIcon(
          <i
            className={`ri-checkbox-circle-fill text-3xl ${alertTextColor}`}
          ></i>
        );
        break;
      case "Warning":
        setAlertIcon(
          <i className={`ri-error-warning-fill text-3xl ${alertTextColor}`}></i>
        );
        break;
      case "Danger":
        setAlertIcon(
          <i className={`ri-close-circle-fill text-3xl ${alertTextColor}`}></i>
        );
        break;
      case "Infomation":
        setAlertIcon(
          <i className={`ri-information-fill text-3xl ${alertTextColor}`}></i>
        );
        break;
      default:
        setAlertIcon(<i className="text-3xl">?</i>);
    }
  }, [alertType, alertTextColor]);

  return (
    <div className="col-center relative h-screen w-screen">
      {isAlert ? (
        <>
          {/* 오버레이 영역 */}
          <Overlay />

          {/* 알람 영역 */}
          <div className=" left-0 right-0 top-1/2 -translate-y-1/2 transform  px-4">
            <div className="max-w-xl ">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`row-center gap-4 rounded-2xl bg-white px-4 py-3 shadow-md ${alertShadowColor}`}
              >
                <div className="row-center">{alertIcon}</div>

                <div className="col-start">
                  <span className={`text-xl font-semibold ${alertTextColor}`}>
                    {alertType}
                  </span>
                  <span className="text-sm">{content}</span>
                </div>
                <div className="">
                  <i
                    className="ri-close-fill text-2xl"
                    onClick={() => dispatch(alertActions.alertClose())}
                  ></i>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

// HOC 적용
export default AlertPortal(AlertComponent);
