import React, {useEffect} from 'react';
import {Container, Form, FormGroup, Label, Input, Button, FormFeedback, Alert, Spinner} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape(
  {
  name: yup.string().max(20).required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  partySize: yup.number().typeError("Party size must be a number").min(1).max(8).required("Party size is required"),
  //partySize: yup.number().min(1).max(8).required("PartySize is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  seating: yup.string().required("Please select a seating preference"),
  dietaryNotes: yup.string().max(30),
  newsletter: yup.string(),
  }
);

const ReservationsPage = () => {

  const [loading, setLoading] = React.useState(false);
  const [formKey, setFormKey] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const { register,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful,errors } } = useForm({resolver: yupResolver(schema),
                                                                                              defaultValues: {
                                                                                                name: "",
                                                                                                email: "",
                                                                                                partySize: "",
                                                                                                date: "",
                                                                                                time: "",
                                                                                                seating: "",
                                                                                                dietaryNotes: "",
                                                                                                newsletter: ""
                                                                                                            }
                                                                                              }
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // This triggers after the submission successfully finishes
    }
  }, [isSubmitSuccessful, reset]);

  const handleChange = (e) => {
    setValue(e.target.name, e.target.value);
  };

  const onSubmit = (data) => {
    setLoading(true); // start the spinner
    // Simulate a 1.5-second network request
    setTimeout(() => {
     // console.log(data);
      setLoading(false); // Stop spinner
      setShowSuccess(true);
      reset();
      setFormKey(prev => prev + 1);
    }, 1500);
  };

  console.log("Validation Errors:", errors);

  return (
    <Container key={formKey} className="mt-4" style={{ maxWidth: '600px' }}>
      <Alert color="success" isOpen={showSuccess} toggle={() => setShowSuccess(false)}>
        Success! Your reservation has been confirmed.
      </Alert>
      <h2>Make a Reservation</h2>
      <Form onSubmit={handleSubmit((data)=> onSubmit(data))}>
        {/*handleSubmit((data)=> onSubmit(data))*/}
        <FormGroup>
          <Label>Name</Label>
          <Input {...register("name")}
                onChange={handleChange}
                 invalid={!!errors.name} />
          <FormFeedback>{errors.name?.message}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input {...register("email")}
                  onChange={handleChange}
                 invalid={!!errors.email} />
          <FormFeedback>{errors.email?.message}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label>Date</Label>
          <Input
            type="date"
            onInput={handleChange}
            //onChange={handleChange}
            {...register("date")}
            invalid={!!errors.date}
          />
          <FormFeedback>{errors.date?.message}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label>Time</Label>
          <Input
            type="time"
            onInput={handleChange}
            //onChange={handleChange}
            {...register("time")}
            invalid={!!errors.time}
          />
          <FormFeedback>{errors.time?.message}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label>Party Size</Label>
          <Input
            type="number"
            onInput={handleChange}
            {...register("partySize")}
            invalid={!!errors.partySize}
          />
          {/*<Input*/}
          {/*  type="number"*/}
          {/*  {...register("partySize", { valueAsNumber: true })}*/}
          {/*  invalid={!!errors.partySize}*/}
          {/*/>*/}

          <FormFeedback>{errors.partySize?.message}</FormFeedback>
        </FormGroup>

        <FormGroup tag="fieldset">
          <legend>Seating Preference</legend>
          {['Indoor', 'Outdoor', 'Bar'].map(opt => (
            <FormGroup check key={opt}>
              <Label check>
                <Input type="radio" value={opt} {...register("seating")}
                        onChange={handleChange}
                       invalid={!!errors.seating} />{opt}

                {/*<Input*/}
                {/*  type="radio"*/}
                {/*  value={opt}*/}
                {/*  {...register("seating")}*/}
                {/*  invalid={!!errors.seating}*/}
                {/*/>{opt}*/}

              </Label>
            </FormGroup>
          ))}
          <FormFeedback>{errors.seating && <span className="text-danger small">{errors.seating.message}</span>}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label>Dietary Notes</Label>
          <Input {...register("dietaryNotes")}
                 onChange={handleChange}
                 invalid={!!errors.dietaryNotes} />
          <FormFeedback>{errors.dietaryNotes?.message}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label>NewsLetter</Label>
          <Input {...register("newsletter")}
                 onChange={handleChange}
                 invalid={!!errors.newsletter} />
          <FormFeedback>{errors.newsletter?.message}</FormFeedback>
        </FormGroup>

        <Button color="primary" className="ms-2" type={"submit"} disabled={loading}>

          {loading ? (<>
                        <Spinner size="sm" className="me-2" />
                        Processing...
                      </>
                      ) : ('Submit Request')
          }

        </Button>
        <button color="secondary" className="ms-2" type={'reset'}>Reset Form</button>
      </Form>
    </Container>
  );
};

export default ReservationsPage;


