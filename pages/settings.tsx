import AppLayout from "@components/Layouts/AppLayout";
import { NextPageWithLayout } from "./_app";

const Settings: NextPageWithLayout = () => {
    return <div></div>;
};

Settings.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Settings;
