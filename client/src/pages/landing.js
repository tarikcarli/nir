export default function Landing() {
  return (
    <div className="flex flex-row h-full w-full justify-center items-center">
      <div className="flex flex-col  max-w-max max-h-max px-8 py-4 border-2 rounded-md border-gray-300 bg-gray-200 transform  -translate-y-24">
        <div className="font-semibold text-lg uppercase">Node Image Recognizer</div>
        <div>The project aims is to show true potential of AI/ML to our users.</div>
        <div>You can register then login. You have 100 request per day and it will renew at 12 at night.</div>
        <div>If you would like to have more request or, would like new functionalities</div>
        <img src="landing_dl.jpg" alt="Deep learning neural network representation" className="sm:max-w-lg self-end rounded-md"></img>
        <div>
          <b>contact us</b> via email:"<i>tarik.carli@tubitak.gov.tr</i>"
        </div>
      </div>
    </div>
  );
}
