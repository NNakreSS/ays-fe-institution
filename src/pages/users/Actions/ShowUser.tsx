import { SingleUser } from "@/types";
import { DeleteButton, Show, TagField } from "@refinedev/antd";
import { useShowReturnType, useTranslate } from "@refinedev/core";
import { Drawer, Typography } from "antd";

const { Title, Text } = Typography;

type Props = useShowReturnType<SingleUser> & {
  setVisibleShowDrawer: (visible: boolean) => void;
  visibleShowDrawer: boolean;
};

const statusToColor = (supportStatus: SingleUser["supportStatus"]) => {
  switch (supportStatus) {
    case "IDLE":
      return "green";
    case "READY":
      return "yellow";
    case "MALFUNCTION":
      return "red";
    case "ACCIDENT":
      return "red";
    case "BUSY":
      return "red";
    case "OFFLINE":
      return "gray";
    case "ON_ROAD":
      return "yellow";
    case "RETURN":
      return "yellow";
    default:
      return "green";
  }
};

export default function ShowUser({ setVisibleShowDrawer, visibleShowDrawer, ...props }: Props) {
  const t = useTranslate();
  const { data: showQueryResult, isLoading: showIsLoading } = props.queryResult;
  const record = showQueryResult?.data;
  return (
    <Drawer
      open={visibleShowDrawer}
      onClose={() => setVisibleShowDrawer(false)}
      width="500"
      title={t("users.actions.show")}
    >
      <Show
        isLoading={showIsLoading}
        headerButtons={
          record?.status !== "DELETED" ? (
            <DeleteButton
              recordItemId={props.showId}
              onSuccess={() => setVisibleShowDrawer(false)}
            />
          ) : (
            <></>
          )
        }
        title=""
      >
        <Title level={5}>{t("users.fields.username")}</Title>
        <Text>{record?.username}</Text>
        <Title level={5}>{t("users.fields.firstName")}</Title>
        <Text>{record?.firstName}</Text>
        <Title level={5}>{t("users.fields.lastName")}</Title>
        <Text>{record?.lastName}</Text>
        <Title level={5}>{t("users.fields.role")}</Title>
        <Text>{t("roles." + record?.role)}</Text>
        <Title level={5}>{t("users.fields.status")}</Title>
        <Text>{t("statuses." + record?.status)}</Text>
        <Title level={5}>{t("users.fields.supportStatus")}</Title>
        <TagField
          value={t("supportStatuses." + record?.supportStatus)}
          color={statusToColor(record?.supportStatus)}
        />
      </Show>
    </Drawer>
  );
}
