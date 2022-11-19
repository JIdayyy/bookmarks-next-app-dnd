import AppLayout from "@components/Layouts/AppLayout";
import { NextPageWithLayout } from "./_app";

const Categories: NextPageWithLayout = () => {
    return <div></div>;
};

Categories.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Categories;
