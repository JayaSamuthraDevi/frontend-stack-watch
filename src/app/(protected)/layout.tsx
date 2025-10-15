import CloudFooter from "@/components/Footer/CloudFooter";
import CloudHeader from "@/components/Header/CloudHeader";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <>
      <CloudHeader />
      <div className='cds--content main-content'>
        {children}
      </div>
      <CloudFooter />
    </>
  )
}

export default layout